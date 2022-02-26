import { ReactNode, useEffect } from "react"
import { useRouter } from "next/router";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import { MotionMain } from "./Motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

type LayoutProps = {
    children?: ReactNode,
    title?: string,
    description?: string,
    navbarTitle?: string,
    coverImage?: string,
    is100vh?: boolean,
    [rest: string]: any;
}

const Layout = ({ children, title, description, navbarTitle, coverImage = '/public/cover.jpg', is100vh, ...rest }: LayoutProps): JSX.Element => {
    const router = useRouter();

    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <>
            <Flex
                direction={'column'}
                as='main'
                flex={1}
                px={5}
                mt={{ base: 6, md: 5 }}
                overflow={'hidden'}
                maxH={is100vh ? '100vh' : 'auto'}
                height={'100%'}
            >
                <MotionMain
                    initial="hidden"
                    animate="enter"
                    variants={variants}
                    transition={{ type: 'ease-in' }}
                    key={router.route}
                    display="flex"
                    flex={1}
                >
                    <Flex
                        d='flex'
                        flexDirection={'row'}
                        mb={4}
                        flex={1}
                    >
                        <Flex
                            flex={1}
                        >
                            {children}
                        </Flex>
                    </Flex>
                </MotionMain>
            </Flex>
        </>
    )
}


export default Layout
