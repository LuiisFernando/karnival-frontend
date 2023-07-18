import Head from "next/head";

import { Container } from "@/styles/Grid";
import CalendarComponent from "@/components/Calendar";

export default function Agenda() {
    return (
        <>
            <Head>
                <title>Karnival: Agenda</title>
            </Head>
            <Container>
                <CalendarComponent views={["month"]} />                
            </Container>
        </>
    );
}