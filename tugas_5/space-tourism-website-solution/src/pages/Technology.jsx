import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import data from '../data.json';

export default function Technology() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const technology = data.technology[selectedIndex];
    const cardRefs = useRef([]);

    // Smooth mouse tracking for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    // ========================================
    // ANIMATION VARIANTS
    // ========================================

    // Container variant for staggered children entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Delay between each child animation
                delayChildren: 0.2,    // Initial delay before starting
            }
        }
    };

    // Item variant for cascading entrance
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    // Number button variants with magnetic effect
    const buttonVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.15,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.95 }
    };

    // Content transition variants
    const contentVariants = {
        enter: {
            x: -50,
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            x: 50,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    // Image transition with blur effect
    const imageVariants = {
        enter: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
        },
        center: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            transition: {
                duration: 0.4
            }
        }
    };

    // ========================================
    // SPOTLIGHT EFFECT HANDLER
    // ========================================
    const handleMouseMove = (e, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* ========================================
                IDLE BACKGROUND ANIMATIONS
                ======================================== */}

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 lg:pt-12 text-center lg:text-left h-full flex flex-col">
                {/* Title with entrance animation */}
                <motion.h5
                    className="text-white text-[16px] md:text-[20px] lg:text-[28px] uppercase tracking-[2.7px] md:tracking-[3.38px] lg:tracking-[4.72px] font-barlow mb-8 md:mb-16 md:text-left md:pl-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="opacity-25 font-bold mr-4">03</span> SPACE LAUNCH 101
                </motion.h5>

                <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between w-full flex-grow">

                    {/* ========================================
                        LEFT: Navigation + Content
                        ======================================== */}
                    <motion.div
                        className="flex flex-col lg:flex-row items-center lg:items-start lg:pl-10 lg:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* ========================================
                            NUMBER NAVIGATION with SPOTLIGHT EFFECT
                            ======================================== */}
                        <motion.div
                            className="flex flex-row lg:flex-col gap-4 mb-8 lg:mb-0"
                            variants={itemVariants}
                        >
                            {data.technology.map((_, index) => (
                                <motion.button
                                    key={index}
                                    ref={el => cardRefs.current[index] = el}
                                    onClick={() => setSelectedIndex(index)}
                                    variants={buttonVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onMouseMove={(e) => handleMouseMove(e, index)}
                                    className={`relative w-12 h-12 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full border-2 text-base md:text-2xl lg:text-2xl font-bellefair transition-all duration-300 overflow-hidden ${selectedIndex === index
                                            ? 'bg-white text-black border-white shadow-2xl shadow-white/50'
                                            : 'bg-transparent text-white border-white/25 hover:border-white'
                                        }`}
                                    aria-label={`View ${data.technology[index].name}`}
                                >
                                    {/* Spotlight gradient overlay */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{
                                            background: selectedIndex !== index ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 60%)` : 'none'
                                        }}
                                    />

                                    {/* Glow ring on active */}
                                    {selectedIndex === index && (
                                        <motion.span
                                            className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30"
                                            initial={{ scale: 1, opacity: 0.3 }}
                                            animate={{ scale: 1.2, opacity: 0 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}

                                    <span className="relative z-10">{index + 1}</span>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* ========================================
                            CONTENT with SMOOTH TRANSITIONS
                            ======================================== */}
                        <motion.div
                            className="text-center lg:text-left max-w-md lg:max-w-lg"
                            variants={itemVariants}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedIndex}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <motion.p
                                        className="text-secondary text-sm md:text-base tracking-widest mb-2 md:mb-4 uppercase"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        THE TERMINOLOGY...
                                    </motion.p>

                                    <motion.h3
                                        className="text-white font-bellefair text-[24px] md:text-[40px] lg:text-[56px] uppercase mb-4 md:mb-6"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {technology.name}
                                    </motion.h3>

                                    <motion.p
                                        className="text-secondary font-barlow text-[15px] md:text-[16px] lg:text-[18px] leading-relaxed"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {technology.description}
                                    </motion.p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    {/* ========================================
                        RIGHT: Image with BLUR TRANSITION
                        ======================================== */}
                    <motion.div
                        className="mb-8 lg:mb-0 w-full lg:w-auto"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence mode="wait">
                            <motion.picture
                                key={selectedIndex}
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <source
                                    media="(min-width: 1024px)"
                                    srcSet={technology.images.portrait}
                                />
                                <motion.img
                                    src={technology.images.landscape}
                                    alt={technology.name}
                                    className="w-full lg:w-auto lg:h-[527px] object-cover rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.picture>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
