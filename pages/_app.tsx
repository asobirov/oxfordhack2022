import { useEffect } from 'react';

import { useRouter } from 'next/router';

import 'focus-visible/dist/focus-visible'

import { SessionProvider, useSession } from 'next-auth/react';
import { ChakraProvider } from "@chakra-ui/react"
import { Provider as ReduxProvider } from 'react-redux';


import { AppPropsWithLayout } from '@lib/types';
import store from '@lib/redux/store';
import theme from "../styles/theme";

import Layout from '@components/Layout';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ||
    Component.navbarTitle && (
      (page) =>
        <Layout
          children={page}
          navbarTitle={Component.navbarTitle}
          is100vh={Component.is100vh}
        />
    ) || (
      (page) =>
        <Layout
          children={page}
          is100vh={Component.is100vh}
        />
    );

  const auth = Component.auth ? (
    (page: any) => (
      <Auth>
        {page}
      </Auth>
    )
  ) : (
    (page: any) => page
  );

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          {auth(getLayout(<Component {...pageProps} />))}
        </ReduxProvider>
      </ChakraProvider >
      <style jsx global>{`
        body {
            background: #111;
        }
      `}</style>
    </SessionProvider>
  )
}

const Auth = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === 'loading') return
    if (!isUser) router.push('/');
  }, [isUser, status])

  if (isUser) {
    return (
      <>{children}</>
    )
  }

  return (<></>)
}