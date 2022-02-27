import { useState } from 'react';

import { useSession, signIn } from 'next-auth/react';

import Image from 'next/image';
import { Stack, Button, Box } from "@chakra-ui/react"
import { Shield } from "iconoir-react"

import nopers from '@public/peepo/nopers.gif'
import nodders from '@public/peepo/nodders.gif'


export const Authentication = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { status } = useSession();

    const handleClick = () => {
        setIsLoading(true);
        signIn('auth0');
    }

    return (
        <>
            <Stack
                direction='column'
                align="center"
                justify={'center'}
                h={'69%'}
                spacing={8}
            >
                <Box
                    overflow='hidden'
                    borderRadius={'2xl'}
                    width={32}
                    height={32}
                >
                    {
                        status === "authenticated" ? (
                            <Image alt='OK' src={nodders} layout='responsive' />
                        ) : (
                            <Image alt='Nope' src={nopers} priority={true} />
                        )
                    }
                </Box>
                <Button
                    size="lg"
                    isLoading={status === "loading" || isLoading}
                    onClick={handleClick}
                    leftIcon={<Shield />}
                >
                    Sign in with Auth0
                </Button>
            </Stack>
        </>
    )
}
