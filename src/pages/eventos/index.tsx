import { Container } from "@/styles/Grid";
import Head from "next/head"

export default function Eventos() {
    return (
        <>
            <Head>
                <title>Karnival: Eventos</title>
            </Head>
            <Container>
                <h1>Eventos</h1>

                <div style={{ backgroundColor: 'red' }}>
                    <p>teste</p>
                </div>
            </Container>
        </>
    );
}