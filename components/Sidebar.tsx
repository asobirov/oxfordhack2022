import { Box, Button, Collapse, Container, Flex, IconButton, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Coin, Dashboard, DashboardDots, Home, Menu, Minus, ReportColumns, } from "iconoir-react";
import Link from "next/link";
import { MotionBox, MotionStack } from "./Motion";
import { MobileNav } from "./Navbar/MobileNav";

const pages = [
    {
        title: "Dashboard",
        icon: <ReportColumns />,
        href: "/dashboard",
    }, {
        title: 'Finances',
        icon: <Coin />,
        href: '/finances',
    }, {
        title: 'University',
        icon: <Home />,
        href: '/uni',
    }
]

const Sidebar = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    return (
        <Flex
            position={{ base: 'fixed', md: 'sticky' }}
            zIndex={'sticky'}
            direction={'column'}
            top={{ md: 0 }}
            left={{ md: 0 }}
            bottom={{ base: 0 }}
            right={{ base: 0, md: 'auto' }}
            ml={{ md: 2 }}
            h={{ base: 'auto', md: '100vh' }}
        >
            <Stack
                px={3}
                py={3}
                my={{ md: 4 }}
                h='100%'
                spacing={5}
                boxShadow={useColorModeValue('none', { base: undefined, md: 'inset 0 0 0 1px rgba(0,0,0,0.01), 0 4px 6px 0px rgba(0, 0, 0, 0.2)' })}
                borderRadius={{ base: 0, md: '1.75rem' }}
                border={{ base: '0px', md: '1px solid' }}
                borderColor={{ base: 'unset', md: useColorModeValue('blackAlpha.600', 'whiteAlpha.300') }}
                zIndex='overlay'
            >
                <Box>
                    <IconButton
                        onClick={onToggle}
                        isActive={isOpen}
                        icon={
                            isOpen ? <Minus /> : <Menu />
                        }
                        h={14}
                        minW={14}
                        fontSize={'md'}
                        borderRadius={'3xl'}
                        variant="icon-button"
                        aria-label={'Toggle Navigation'}
                    />
                    <MobileNav
                        isOpen={isOpen}
                        onToggle={onToggle}
                    />
                </Box>
                <Stack>
                    {pages.map((page, i) => (
                        <Link
                            key={page.title + i}
                            href={page.href}
                        >
                            <IconButton
                                key={page.title}
                                aria-label={page.title}
                                icon={page.icon}
                                h={14}
                                minW={14}
                                fontSize={'md'}
                                borderRadius={'3xl'}
                                variant="icon-button"
                                onClick={() => isOpen && onClose()}
                            />
                        </Link>
                    ))}
                </Stack>
            </Stack>
            <Box
                display={{ base: 'block', md: 'none' }}
                px={3}
                py={3}
            >
                <IconButton
                    aria-label="Open Mobile Navigation Bar"
                    icon={<Minus />}
                    h={14}
                    minW={14}
                    fontSize={'md'}
                    borderRadius={'3xl'}
                    variant="icon-button"
                />
            </Box>
        </Flex>
    )
}

export default Sidebar;