import { NextPageWithLayout } from '@lib/types';

import { useState } from 'react';
import { useSession, signIn, getSession } from 'next-auth/react';

import Image from 'next/image';
import { Box, Button, Stack } from '@chakra-ui/react';

import { GitHub } from 'iconoir-react';

import nopers from '@public/peepo/nopers.gif'
import nodders from '@public/peepo/nodders.gif'
import { GetServerSideProps } from 'next';
import { Authentication } from '@components/Auth';

const Home: NextPageWithLayout = () => {
  return (<Authentication />)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

Home.getLayout = (page) => page;
Home.auth = false;

export default Home
