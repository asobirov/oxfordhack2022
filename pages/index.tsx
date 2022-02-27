import { NextPageWithLayout } from '@lib/types';

import { getSession } from 'next-auth/react';

import { GetServerSideProps } from 'next';
import { Authentication } from '@components/Auth';
import { Box, Button, Stack, useColorModeValue, Text, Heading, useDisclosure } from '@chakra-ui/react';
import ImageUpload from '@components/Image/Upload';
import { useSelector } from 'react-redux';
import { AppState } from '@lib/redux/store';
import axios from 'axios';
import WebcamModal from '@components/WebcamModal';
import ImageList from '@components/ImageList';

const Home: NextPageWithLayout = () => {
  const { base64 } = useSelector((state: AppState) => state.imageUpload);
  const handleImageSubmit = async () => {
    if (base64) {
      await axios.post('/api/upload', {
        base64
      });
    }
  }


  const { onOpen, isOpen, onClose } = useDisclosure();
  const handleOpenCamera = async () => {
    onOpen();
  }

  return (
    <>
      <Stack
        h='full'
        w={'full'}
        direction={'row'}
        align={'center'}
        justify={'center'}
        spacing={6}
      >
        <Stack
          align={'center'}
          background={useColorModeValue('whiteAlpha.600', 'blackAlpha.600')}
          borderRadius={'2rem'}
          boxShadow={'lg'}
          pt={10}
          pb={8}
          px={8}
          spacing={8}
          maxW={'36rem'}
        >
          <Stack
            textAlign={'center'}
          >
            <Heading>
              Upload your images
            </Heading>
            <Text>
              PNG, JPG and JPEG files are allowed.
            </Text>
          </Stack>
          <Stack
            spacing={4}
          >
            <ImageUpload />
            <Heading
              textAlign={'center'}
              size={'md'}
            >
              OR
            </Heading>
            <Button
              onClick={handleOpenCamera}
              variant={'outline'}
              size={'lg'}
              isLoading={false}
            >
              Open Camera
            </Button>
            <WebcamModal isOpen={isOpen} onClose={onClose} />
            {/* <IconButton
              aria-label={'Upload image'}
              onClick={handleImageSubmit}
              variant={'icon-button'}
              size='lg'
              
              icon={<Camera width="1.25rem" height="1.25rem" />}
            /> */}
          </Stack>
          <Button
            disabled={!base64}
            onClick={handleImageSubmit}
          >
            Submit
          </Button>
          <ImageList />

        </Stack>
      </Stack>
    </>
  )
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

Home.auth = false;

export default Home
