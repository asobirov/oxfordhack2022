import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

import {
    Box,
    Flex,
    Text,
    IconButton,
    Heading,
    Stack,
    Collapse,
    Container,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { Link } from './Link';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { Menu, Minus, GitHub, LinkedIn, Mail, LogOut } from 'iconoir-react'

import { ArrowRight as ChevronRightIcon } from 'iconoir-react';


type NavItem = {
    label: string;
    subLabel?: string;
    children?: NavItem[];
    href?: string;
    disabled?: boolean;
    visible?: boolean;
}

const NAV_ITEMS: NavItem[] = [];

const socials = [
    {
        label: 'GitHub',
        icon: <GitHub />,
        href: 'https://github.com/asobirov'
    },
    {
        label: 'LinkedIn',
        icon: <LinkedIn />,
        href: 'https://www.linkedin.com/in/asobirov/'
    },
    {
        label: 'Email',
        icon: <Mail />,
        href: 'mailto:contact@asobirov.uz'
    },

]

export default function Navbar({ heading }: { heading?: string }) {
    const { status } = useSession();

    const { isOpen, onToggle } = useDisclosure();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen])

    const handleOutsideClick = () => {
        if (isOpen) {
            onToggle();
        }
    }

    const handleSignOut = () => {
        signOut();
    }
    return (
        <Flex
            position={{ base: 'relative', md: 'sticky' }}
            // left={0}
            // right={0}
            top={0}
            // bg='blackAlpha.700'
            zIndex={'sticky'}
        >
            <Flex
                flex={1}
                px={{ base: 0, md: 5 }}
                mt={4}
                bg={{ base: undefined, md: useColorModeValue('#f5f5f7', '#111') }}
                boxShadow={useColorModeValue('none', { base: undefined, md: 'inset 0 0 0 1px rgba(0,0,0,0.01), 0 4px 6px 0px rgba(0, 0, 0, 0.2)' })}
                borderRadius={{ base: 0, md: '3xl' }}
                border={{ base: '0px', md: '1px solid' }}
                borderColor={{ base: 'unset', md: useColorModeValue('blackAlpha.600', 'whiteAlpha.300') }}
            // backdropFilter={{ base: undefined, md: 'blur(40px)' }}
            >
                <Flex
                    // color={useColorModeValue('gray.600', 'white')}
                    align={'center'}
                    justify='space-between'
                    flex={1}
                    minH={{ base: 12, md: 16 }}
                    position='relative'
                    zIndex={{ md: 'overlay' }}
                >
                    <Flex flex={1}>
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? <Minus /> : <Menu />
                            }
                            size='lg'
                            isActive={isOpen}
                            variant="icon-button"
                            zIndex='overlay'
                            aria-label={'Toggle Navigation'}
                        />
                    </Flex>

                    {heading && (
                        <Heading
                            display={'flex'}
                            isTruncated
                            textTransform='lowercase'
                            px={4}
                        >
                            {heading}
                        </Heading>
                    )}
                    <Stack
                        direction={'row'}
                        justifyContent={'flex-end'}
                        spacing={5}
                        flex={1}
                    >
                        {status === "authenticated" &&
                            <IconButton
                                aria-label='Sign out'
                                size={'lg'}
                                variant="icon-button"
                                icon={<LogOut width="1.25rem" height="1.25rem" />}
                                onClick={handleSignOut}
                            />}
                        <ColorModeSwitcher />
                    </Stack>
                </Flex>
                <Box
                    display={'flex'}
                    position='fixed'
                    left='0'
                    right='0'
                    top='0'
                    bottom='0'
                    zIndex='1'
                    backdropFilter={isOpen ? "blur(10px) brightness(.9)" : "none"}
                    transition="all 0.33s ease"
                    pointerEvents={{ base: isOpen ? 'auto' : 'none', md: 'none' }}
                    onClick={() => handleOutsideClick()}
                >
                    <Container
                        mt={20}
                        pb={10}
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
                            <MobileNav navBarOnToggle={onToggle} />
                        </Box>
                    </Container>
                </Box>
            </Flex >
        </Flex >
    );
}

const DesktopNav = () => {

    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const defDelay = 0.05;
    return (
        <Stack direction={'row'} spacing={5}>
            {NAV_ITEMS.map((navItem, key) => navItem.visible && (
                <motion.div
                    key={key}
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: (key * defDelay),
                        duration: 0.25
                    }}
                >
                    <Popover trigger={'hover'} placement={'bottom-start'}>

                        {navItem.children ? (
                            <>
                                <PopoverTrigger>
                                    <Link
                                        href={navItem.href ?? '#'}
                                        activeOnPage
                                        variant={'hover-through'}
                                        fontWeight={400}
                                        py={1}
                                        textDecoration='lowercase'
                                    >
                                        {navItem.label}11
                                    </Link>
                                </PopoverTrigger>
                                <PopoverContent
                                    border={0}
                                    boxShadow={'xl'}
                                    bg={popoverContentBgColor}
                                    p={4}
                                    rounded={'xl'}
                                    minW={'sm'}>
                                    <Stack>
                                        {navItem.children.map((child) => (
                                            <DesktopSubNav key={child.label} {...child} />
                                        ))}
                                    </Stack>
                                </PopoverContent>
                            </>
                        ) : (
                            <Link
                                href={navItem.href ?? '#'}
                                activeOnPage
                                variant={'hover-bg'}
                                // fontSize='sm'
                                fontWeight={500}
                                h={'full'}
                                textTransform='lowercase'
                            >
                                {navItem.label}
                            </Link>
                        )}
                    </Popover>
                </motion.div>
            ))
            }
        </Stack >
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href ?? '#'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'green.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

export const MobileNav = ({ navBarOnToggle }: any) => {
    return (
        <Stack
            py={12}
            spacing={0}
            align={'center'}
            justify={'space-between'}
            overflow="scroll"
            h='100%'
            sx={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                    display: "none"
                }
            }}
        >
            <Box flex={1} w='100%'>
                {NAV_ITEMS.map((navItem, key) => (
                    navItem.visible && <MobileNavItem navBarOnToggle={navBarOnToggle} key={key} {...navItem} />
                ))}
            </Box>
            <Stack direction='row' spacing={6}>
                {socials.map((s, key) => (
                    <Link
                        key={key}
                        href={s.href}
                        isExternal
                        variant='scale-on-hover'
                        fontSize='xl'
                        aria-label={s.label}
                    >
                        {s.icon}
                    </Link>
                ))}
            </Stack>
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, navBarOnToggle }: NavItem | any) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack
            w='full'
            spacing={4}
            onClick={children && onToggle}
        >
            <Link
                d='flex'
                w='full'
                py={2}
                px={6}
                href={href ?? '#'}
                activeOnPage
                onClick={() => navBarOnToggle()}
                justifyContent={'center'}
                alignItems={'center'}
                bg='none'
                _hover={{
                    textDecoration: 'none',
                    "& > p": {
                        color: useColorModeValue('black', 'white'),
                        textShadow: useColorModeValue('0px 0px 2px rgba(0, 0, 0, 0.3)', '0px 0px 2px white'),
                    }
                }}

                sx={{
                    '&.active > p': {
                        color: useColorModeValue('black', 'white'),
                    }
                }}
            >
                <Text
                    fontWeight={600}
                    fontSize={'2xl'}
                    color={useColorModeValue('blackAlpha.800', 'whiteAlpha.700')}
                    transition={'all .3s ease'}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        // as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Link>
            {
                children && (
                    <Collapse in={isOpen} animateOpacity>
                        <Stack
                            mt={2}
                            pl={4}
                            borderLeft={1}
                            borderStyle={'solid'}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}
                            align={'start'}>
                            {children.map((child: any) => (
                                <Link
                                    key={child.label}
                                    activeOnPage
                                    py={2}
                                    href={child.href}
                                    onClick={() => navBarOnToggle()
                                    }>
                                    {child.label}
                                </Link>
                            ))}
                        </Stack>
                    </Collapse>
                )
            }
        </Stack >
    );
};