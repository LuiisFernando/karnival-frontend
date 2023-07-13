import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { setCookie, parseCookies, destroyCookie } from "nookies";
import jwt_decode from 'jwt-decode';
import { toast } from "react-toastify";

import { IUser, IUserDecoded, ILoginForm } from "@/types/User";
import { ErrorMessageDefault, ErrorMessageDefaultWithMessage } from "@/Utils/Messages.string";
import { loginService } from "@/services/authenticationService";
import { getSystemConfiguration } from "@/services/systemConfigurationService";
import { ISystemConfiguration } from "@/types/SystemConfiguration";

type AuthProviderType = {
	children: ReactNode;
}

type ContextProps = {
    user: IUser | null;
    systemConfiguration: ISystemConfiguration | null;
    login: (data: ILoginForm) => void;
    logout: () => void;
    resetAll: () => void;
    setSystemConfiguration: any;
}

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }: AuthProviderType ) {
    const [user, setUser] = useState<IUser | null>(null);
    const [systemConfiguration, setSystemConfiguration] = useState<ISystemConfiguration | null>(null);
    const route = useRouter();

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
        resetAll();
        route.push('/');
    }

    function resetAll() {
        destroyCookie({}, 'karnival.token', {
            path: '/'
        });
        setUser(null);
    }

    async function loadSystemConfiguration() {
        try {
            const response = await getSystemConfiguration();
            setSystemConfiguration(response.data);
        } catch { }
    }

    useEffect(() => {
        const { ['karnival.token']: token } = parseCookies();

        loadSystemConfiguration();

        if (token) {
            const tokenDecoded = jwt_decode<IUserDecoded>(token);
            
            let userDecoded: Partial<IUser> = {};
            userDecoded.id = Number(tokenDecoded.nameid);
            userDecoded.name = tokenDecoded.unique_name;
            userDecoded.roleDescription = tokenDecoded.role;
            setUser(userDecoded as IUser);
        } else {
            setUser(null);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{
            user,
            systemConfiguration,
            setSystemConfiguration,
            login,
            logout,
            resetAll
        }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthProvider as default, useAuth };