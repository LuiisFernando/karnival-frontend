import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from "nookies";
import jwt_decode from 'jwt-decode';

import { loginService } from "@/services/loginService";
import { IUser, IUserDecoded, LoginForm, Role } from "@/types/Login";

type AuthProviderType = {
	children: ReactNode;
}

type ContextProps = {
    user: IUser | null,
    login: (data: LoginForm) => void;
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
            console.log(tokenDecoded);
            let userDecoded: Partial<IUser> = {};
            userDecoded.id = Number(tokenDecoded.nameid);
            userDecoded.name = tokenDecoded.unique_name;
            userDecoded.role = tokenDecoded.role as Role;
            setUser(userDecoded as IUser);
        }
    }, []);

    async function login(data: LoginForm) {
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
    }

    async function logout() {
        destroyCookie({}, 'karnival.token', {
            path: '/'
        });
        setUser(null);
        route.reload();
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