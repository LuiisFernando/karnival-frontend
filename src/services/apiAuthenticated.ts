import axios from "axios";
import { GetServerSidePropsContext } from "next";

export function getApiAuthenticated(ctx: GetServerSidePropsContext) {
    const apiAuth = axios.create({
        
    });
}