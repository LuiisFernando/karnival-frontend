import { GetServerSideProps } from 'next';
import { withSSRAuth } from "@/Utils/withAuth";

function Usuarios() {
    return (
        <>
            <h1>Usuarios</h1>
        </>
    );
}

export default Usuarios;

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx: any) => {

    return {
      props: {}
    }
  }, true);
  