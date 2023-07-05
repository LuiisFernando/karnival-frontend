
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { IUser } from '@/types/User';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export function withSSRAuth<P>(fn: Function, onlyAdm: boolean) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        try {
            const cookies = parseCookies(ctx);
            const token = cookies['karnival.token'];
            
            if (!token) {               
                return {
                    redirect: {
                        permanent: false,
                        destination: '/'
                    }
                };
            }
            
            const tokenDecode = jwt_decode<IUser>(token);

            if (onlyAdm && tokenDecode.role === 'Administrador') {
                return await fn(ctx);

            } else {
                return {
                    redirect: {
                        permanent: false,
                        destination: '/'
                    }
                };
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
            return {
                redirect: {
                    permanent: false,
                    destination: '/'
                }
             };
        }
    }
}