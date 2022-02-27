import { NextPageWithLayout } from '@lib/types';
import { Authentication } from '@components/Auth';

const Home: NextPageWithLayout = () => <Authentication />;

Home.getLayout = (page) => page;
Home.auth = false;

export default Home
