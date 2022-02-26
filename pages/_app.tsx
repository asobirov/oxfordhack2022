import { SessionProvider, signIn, useSession } from 'next-auth/react';


import { ChakraProvider } from "@chakra-ui/react"
import 'focus-visible/dist/focus-visible'
import theme from "../styles/theme"

import { AppPropsWithLayout } from '@lib/types';

import Layout from '@components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
        {auth(getLayout(<Component {...pageProps} />))}
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