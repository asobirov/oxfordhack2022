import { Stack, useColorModeValue, Box, Collapse, Text, Portal } from "@chakra-ui/react";
import Clock from "@components/Clock";
import { MotionStack, MotionBox } from "@components/Motion";



export const MobileNav = ({ isOpen, onToggle }: any) => {

    const handleOutsideClick = () => {
        if (isOpen) {
            onToggle();
        }
    }

    return (
        <Portal>
            <Box
                display={'flex'}
                position='fixed'
                left='0'
                right='0'
                top='0'
                bottom='0'
                zIndex='dropdown'
                backdropFilter={isOpen ? "blur(10px) brightness(.9)" : "none"}
                transition="all 0.33s ease"
                pointerEvents={isOpen ? 'auto' : 'none'}
                onClick={() => handleOutsideClick()}
            >
                <Stack
                    direction={'row'}
                    spacing={4}
                    my={4}
                    pl={{ base: 0, md: '6.75rem' }}
                    pr={4}
                    flex={1}
                >
                    <Box
                        as={Collapse}
                        in={isOpen}
                        animateOpacity
                        endingHeight="100%"
                        bg={useColorModeValue('#efefef', 'black')}
                        transition={'background-color 250ms'}
                        borderRadius={'3xl'}
                        maxW={'lg'}
                        w='full'
                    >
                    </Box>
                    <Stack
                        w='100%'
                        spacing={4}
                    >
                        <HContainer isOpen={isOpen} n={0}>
                            <Stack align={'flex-end'}>
                                <Clock />
                            </Stack>
                        </HContainer>
                        <HContainer isOpen={isOpen} n={1}>

                        </HContainer>
                    </Stack>
                </Stack>
            </Box>
        </Portal>
    );
};

type HContainerProps = {
    isOpen: boolean;
    n: number;
    children: any;
}

const HContainer = ({ isOpen, n, children }: HContainerProps) => {
    const variants = {
        exit: ({ i, j }: any) => ({
            opacity: 0,
            overflow: 'hidden',
            width: 0,
            transition: {
                delay: j * 0.1,
                width: {
                    duration: 0.15,
                    ease: [0.25, 0.1, 0.25, 1]
                },
                opacity: {
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1]
                },
            },
        }),
        enter: ({ i, j }: any) => ({
            opacity: 1,
            width: '100%',
            transition: {
                delay: i * 0.1,
                width: {
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1]
                },
                opacity: {
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1]
                },
            }
        }),
    }
    return (
        <MotionBox
            bg={useColorModeValue('#efefef', 'black')}
            transition={'background-color 250ms'}
            borderRadius={'3xl'}
            w='full'
            flex={1}
            px={5}
            py={5}
            variants={variants}
            custom={n ? { i: 1, j: 0 } : { i: 0, j: 1 }}
            initial="exit"
            animate={isOpen ? "enter" : "exit"}
        >
            {children}
        </MotionBox>
    )
} 