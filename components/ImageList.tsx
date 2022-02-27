import { IconButton, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { AppState } from "@lib/redux/store";
import { DeleteCircledOutline } from "iconoir-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { resetImage } from "@lib/redux/slices/imageUploadSlice";

const ImageList = () => {
    const dispatch = useDispatch();
    const { url, base64 } = useSelector((state: AppState) => state.imageUpload);

    const borderColor = useColorModeValue("whiteAlpha.200", "blackAlpha.200");
    return (
        <Stack w='100%'>
            {url && (
                <Stack
                    direction={'row'}
                    spacing={4}
                    align={'center'}
                    justify={'space-between'}
                    border={'1px'}
                    borderColor={borderColor}
                    w='100%'
                >
                    <Image
                        src={url}
                        width={'100%'}
                        height={'100%'}
                        objectFit={'contain'}
                    />
                    <Stack w='100%'>
                        <Text>
                            Can
                        </Text>
                        <Text>
                            88.3%
                        </Text>
                    </Stack>
                    <IconButton
                        icon={<DeleteCircledOutline />}
                        aria-label={'Delete'}
                        onClick={() => dispatch(resetImage())}
                    />
                </Stack>
            )}

        </Stack>
    )
}

export default ImageList