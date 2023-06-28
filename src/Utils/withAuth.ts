
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { IUser } from '@/types/Login';
import { NextPageContext } from 'next';

export function withSSRAuth(fn: Function, onlyAdm: boolean) {
    return async (ctx: any) => {
        try {
            const cookies = parseCookies(ctx);
            const token = cookies['karnival.token'];
            if (!token) {
                ctx.res.statusCode = 302;
                ctx.res.setHeader('Location', `/login`);
                return { props: {} };
            }

            const tokenDecode = jwt_decode<IUser>(token);

            console.log(tokenDecode);

            if (onlyAdm && tokenDecode.role === 'Administrador') {
                return await fn(ctx);

            } else {
                ctx.res.statusCode = 302;
                ctx.res.setHeader('Location', `/login`);
                return { props: {} };
            }



            // if (tokenDecode.roles === null) {
            //     ctx.res.statusCode = 302;
            //     ctx.res.setHeader('Location', `/login`);
            //     return { props: {} };
            // }

            // if (moment.unix(tokenDecode.exp).isBefore(moment())) {
            //     if (!refreshToken) {
            //         ctx.res.statusCode = 302;
            //         ctx.res.setHeader('Location', `/login`);
            //         return { props: {} };
            //     }
            // }


            return await fn(ctx);
        } catch (err) {
            console.log('erro >>>> ', err);
            ctx.res.statusCode = 302;
            ctx.res.setHeader('Location', `/login`);
            return { props: {} };
        }
    }
}