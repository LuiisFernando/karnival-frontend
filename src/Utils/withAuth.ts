
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { fromUnixTime, isBefore } from 'date-fns';

import { IUserDecoded, Role } from '@/types/User';

export function withSSRAuth<P>(fn: Function, role: Role) {
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
            
            const tokenDecode = jwt_decode<IUserDecoded>(token);
            const dateToken = fromUnixTime(tokenDecode.exp);
            const currentDate = fromUnixTime(Math.floor(Date.now() / 1000));

            if (isBefore(dateToken, currentDate)) {
                
                destroyCookie(ctx, 'karnival.token', {
                    path: '/'
                });

                return {
                    redirect: {
                        permanent: false,
                        destination: '/login'
                    }
                };
            }


            if (tokenDecode.role === role) {
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