"use client";

import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Standard Easings
export const eases = {
    soft: [0.4, 0, 0.2, 1] as any,
    inOutSmooth: [0.65, 0, 0.35, 1] as any,
    outBack: [0.34, 1.56, 0.64, 1] as any,
    spring: [0.175, 0.885, 0.32, 1.275] as any,
};

// Fade Up Entrance
export const FadeIn = ({ children, delay = 0, direction = "up", distance = 20 }: { children: ReactNode, delay?: number, direction?: "up" | "down" | "left" | "right", distance?: number }) => {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.5,
                delay,
                ease: eases.soft,
            }}
        >
            {children}
        </motion.div>
    );
};

// Scale Hover & Tap
export const Pressable = ({ children, className = "", scale = 1.03 }: { children: ReactNode, className?: string, scale?: number }) => (
    <motion.div
        whileHover={{ scale }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger Container
export const Stagger = ({ children, delay = 0.1, interval = 0.05 }: { children: ReactNode, delay?: number, interval?: number }) => (
    <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
            animate: {
                transition: {
                    staggerChildren: interval,
                    delayChildren: delay,
                },
            },
        }}
    >
        {children}
    </motion.div>
);

// Stagger Item (used inside Stagger)
export const StaggerItem = ({ children, distance = 20 }: { children: ReactNode, distance?: number }) => (
    <motion.div
        variants={{
            initial: { opacity: 0, y: distance },
            animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.4, ease: eases.soft }}
    >
        {children}
    </motion.div>
);
