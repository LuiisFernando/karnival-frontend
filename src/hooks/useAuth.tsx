import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from "nookies";
import jwt_decode from 'jwt-decode';
import { toast } from "react-toastify";

import { IUser, IUserDecoded, ILoginForm, Role } from "@/types/User";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/ErrorMessage.string";
import { loginService } from "@/services/authenticationService";

type AuthProviderType = {
	children: ReactNode;
}

type ContextProps = {
    user: IUser | null,
    login: (data: ILoginForm) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }: AuthProviderType ) {
    const [user, setUser] = useState<IUser | null>(null);

    const route = useRouter();

    useEffect(() => {
        const { ['karnival.token']: token } = parseCookies();

        if (token) {
            const tokenDecoded = jwt_decode<IUserDecoded>(token);
            
            let userDecoded: Partial<IUser> = {};
            userDecoded.id = Number(tokenDecoded.nameid);
            userDecoded.name = tokenDecoded.unique_name;
            userDecoded.role = tokenDecoded.role as Role;
            setUser(userDecoded as IUser);
        }
    }, []);

    async function login(data: ILoginForm) {
        try {
            const response = await loginService(data.email, data.password);
            
            destroyCookie({}, 'karnival.token', {
                path: '/'
            });
    
            setCookie(undefined, 'karnival.token', response.data.token, {
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                path: '/'
            });
    
            setUser(response.data.user);
    
            route.push("/");
        } catch(e: any) {
            const errorMessage = e?.response?.data?.Message ? `${ErrorMessageDefaultWithMessage(e?.response?.data?.Message)}` : ErrorMessageDefault;
            toast.error(errorMessage);
        }
    }

    async function logout() {
        destroyCookie({}, 'karnival.token', {
            path: '/'
        });
        setUser(null);
        route.push('/');
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider as default, useAuth };