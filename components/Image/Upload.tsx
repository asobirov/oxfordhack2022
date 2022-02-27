import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@lib/redux/store";

import Image from "next/image";
import { Box, Flex, Heading, Icon, Spinner, Stack, useColorModeValue } from "@chakra-ui/react"

import { AddMediaImage } from "iconoir-react";

import { setImage } from "@lib/redux/slices/imageUploadSlice";


const ImageUpload = () => {
    const dispatch = useDispatch();

    const { url } = useSelector((state: AppState) => state.imageUpload);

    const inputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
    const [isDragLeave, setIsDragLeave] = useState<boolean>(false);
    const [isDrop, setIsDrop] = useState<boolean>(false);

    const handleClick = () => {
        setIsLoading(true);
        inputRef.current?.click();
    }

    const handleChange = async (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async () => {
                const image = reader.result;
                if (image) {
                    dispatch(setImage({
                        base64: image,
                        url: URL.createObjectURL(e.target.files[0])
                    }));
                }
            }
        }
        setIsLoading(false);
    }

    const handleDragEnter = () => {
        setIsDragEnter(true);
    }

    const handleDragLeave = () => {
        setIsDragLeave(true);
    }

    const handleOnDrop = (e: any) => {

        e.preventDefault();
        e.stopPropagation();

        setIsDragEnter(false);
        setIsDragLeave(false);
        setIsDrop(true);


        const file = e.dataTransfer.files[0];
        if (file) {
            // dispatch(setImage({

            // }));
        }
    }

    const color = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

    return (
        <Flex
            onDragEnterCapture={() => setIsDragEnter(true)}
            onDragLeaveCapture={() => setIsDragLeave(true)}
            onDropCapture={handleOnDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={inputRef}
                onChangeCapture={handleChange}
                accept="image/*"
                capture={true}
                hidden
            />
            <Box
                overflow='hidden'
                position='relative'
                w={'32rem'}
                h='auto'
                maxW={'32rem'}
                maxH={'32rem'}
                borderRadius={'1.75rem'}
                boxShadow={'2xl'}
            >
                <Stack
                    align="center"
                    justify="center"
                    backgroundImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='28' ry='28' stroke='%23333' stroke-width='5' stroke-dasharray='8%2c 20' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`}
                    w={'32rem'}
                    h={60}
                    p={12}
                    spacing={6}
                >

                    <Icon
                        as={AddMediaImage}
                        w={'20%'}
                        h={'auto'}
                    />
                    <Heading fontSize={'xl'}>
                        Drag and drop or browse to choose a file
                    </Heading>
                </Stack>
            </Box>
        </Flex >
    )
}

export default ImageUpload;