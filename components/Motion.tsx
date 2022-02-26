import { motion } from "framer-motion";
import { chakra, Stack, Grid } from "@chakra-ui/react";

export const MotionMain = chakra(motion.main);
export const MotionBox = motion(chakra.div);
export const MotionGrid = motion(Grid);
export const MotionStack = motion(Stack);