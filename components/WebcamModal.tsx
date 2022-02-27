import { memo, useCallback, useEffect, useRef } from "react";

import { Text, Collapse, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, useColorModeValue, useToast } from "@chakra-ui/react"

import Webcam from 'react-webcam'
import { Camera } from "iconoir-react";
import { useDispatch } from "react-redux";

import { setImage } from "@lib/redux/slices/imageUploadSlice";

type WebcamModalProps = {
    onClose: () => void;
    isOpen: boolean;
}

const WebcamModal = memo(({ onClose, isOpen }: WebcamModalProps) => {
    const dispatch = useDispatch();
    const toast = useToast();

    const webcamRef = useRef<any>(null);

    const handleClose = () => {
        webcamRef.current?.stopAndCleanup();
        onClose();
    }

    const capture = useCallback(async () => {
        // save image as blob url using canvas
        try {
            const canvas = webcamRef.current?.getCanvas();

            const url = URL.createObjectURL(await new Promise(resolve => canvas.toBlob(resolve)));
            const base64 = canvas.toDataURL('image/jpeg');

            if (!base64 || !url) {
                throw new Error("no base64 or url");
            }
            dispatch(setImage({
                base64: base64,
                url: url
            }));

        } catch (error) {
            toast({
                title: "Error",
                description: "Could not take picture",
                status: "error",
                duration: 9000,
                position: 'bottom-right',
                isClosable: true
            });
        }
        onClose();
    }, [webcamRef]);

    const handleCapture = () => {
        capture();
    }
    return (
        <Modal
            onClose={handleClose}
            size='2xl'
            isOpen={isOpen}
        >
            <ModalOverlay
                bg={'none'}
                backdropFilter={'blur(8px)'}
            />
            <ModalContent
                bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')}
                borderRadius={'2rem'}
            >
                <ModalHeader
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    paddingInlineEnd={6}
                    paddingInlineStart={7}
                    pt={6}
                    pb={3}
                    userSelect={'none'}
                >
                    <Heading
                        size={'lg'}
                    >
                        Take a picture
                    </Heading>
                    <ModalCloseButton
                        position={'unset'}
                    />
                </ModalHeader>

                <ModalBody
                    px={5}
                    pb={5}
                >
                    <Stack
                        position={'relative'}
                        align={'center'}
                        overflow={'hidden'}
                        borderRadius={'2rem'}
                    >
                        <Collapse in={isOpen} animateOpacity>
                            <Webcam
                                ref={webcamRef}
                                audio={false}
                                screenshotFormat={'image/jpeg'}
                            />
                        </Collapse>

                        <IconButton
                            position={'absolute'}
                            bottom={2}
                            aria-label={'Take a picture'}
                            size='lg'
                            variant={'icon-button'}
                            icon={<Camera width={'1.25rem'} height={'1.25rem'} />}
                            background={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
                            backdropFilter={'blur(20px)'}
                            onClick={handleCapture}
                        />
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
})

export default WebcamModal