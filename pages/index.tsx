import { NextPageWithLayout } from '@lib/types';
import { Authentication } from '@components/Auth';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

const Home: NextPageWithLayout = () => <Authentication />;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/upload',
                permanent: false,
            }
        }
    }
    console.log(session)
    return {
        props: {}
    }
}

Home.getLayout = (page) => page;
Home.auth = false;

export default Home
