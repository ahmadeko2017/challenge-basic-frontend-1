import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import data from '../data.json';

export default function Destination() {
    const [selectedDestination, setSelectedDestination] = useState(data.destinations[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const tabRefs = useRef([]);

    // Smooth mouse tracking for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    // ========================================
    // ANIMATION VARIANTS
    // ========================================

    // Container for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            }
        }
    };

    // Individual items entrance
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 120
            }
        }
    };

    // Planet image animations with continuous float
    const planetVariants = {
        enter: {
            opacity: 0,
            scale: 0.8,
            rotate: -25,
            filter: "blur(10px)"
        },
        center: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 1.2,
            rotate: 25,
            filter: "blur(10px)",
            transition: {
                duration: 0.5
            }
        }
    };

    // Content transition
    const contentVariants = {
        enter: {
            x: -30,
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        exit: {
            x: 30,
            opacity: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    // Tab button hover variants
    const tabVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.95 }
    };

    // ========================================
    // HANDLERS
    // ========================================

    const handleDestinationChange = (destination) => {
        if (destination.name === selectedDestination.name) return;

        setIsAnimating(true);
        setTimeout(() => {
            setSelectedDestination(destination);
            setIsAnimating(false);
        }, 300);
    };

    // Spotlight effect on tabs
    const handleMouseMove = (e, index) => {
        const tab = tabRefs.current[index];
        if (!tab) return;

        const rect = tab.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-6 pt-6 pb-12 lg:pt-12 text-center lg:text-left overflow-hidden">

            {/* ========================================
                IDLE BACKGROUND ANIMATIONS
                ======================================== */}

            {/* Floating Atmospheric Orbs */}
            <motion.div
                className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            <motion.div
                className="absolute bottom-10 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* ========================================
                MAIN CONTENT
                ======================================== */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Title */}
                <motion.h5
                    className="text-white text-[16px] md:text-[20px] lg:text-[28px] uppercase tracking-[2.7px] md:tracking-[3.38px] lg:tracking-[4.72px] font-barlow mb-8 md:mb-16 md:text-left"
                    variants={itemVariants}
                >
                    <span className="opacity-25 font-bold mr-4">01</span> Pick your destination
                </motion.h5>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* ========================================
                        PLANET IMAGE with FLOATING ANIMATION
                        ======================================== */}
                    <motion.div
                        className="flex justify-center lg:justify-start lg:pl-16"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDestination.name}
                                variants={planetVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="relative"
                            >
                                {/* Glow ring around planet */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                                        filter: 'blur(20px)',
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Planet with continuous float */}
                                <motion.img
                                    src={selectedDestination.images.png}
                                    alt={selectedDestination.name}
                                    className="w-[170px] h-[170px] md:w-[300px] md:h-[300px] lg:w-[445px] lg:h-[445px] relative z-10"
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.3 }
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* ========================================
                        CONTENT SECTION
                        ======================================== */}
                    <motion.div
                        className="flex flex-col items-center lg:items-start lg:pr-24 lg:pt-8 min-h-[400px]"
                        variants={itemVariants}
                    >
                        {/* ========================================
                            TAB NAVIGATION with SPOTLIGHT EFFECT
                            ======================================== */}
                        <ul className="flex gap-8 mb-8 md:mb-10 text-secondary font-barlow text-[14px] md:text-[16px] tracking-[2.36px] uppercase h-8">
                            {data.destinations.map((dest, index) => (
                                <motion.li
                                    key={dest.name}
                                    variants={itemVariants}
                                >
                                    <motion.button
                                        ref={el => tabRefs.current[index] = el}
                                        onClick={() => handleDestinationChange(dest)}
                                        variants={tabVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        whileTap="tap"
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        className={`relative h-full pb-2 transition-all duration-300 group ${selectedDestination.name === dest.name
                                            ? 'text-white'
                                            : 'text-secondary'
                                            }`}
                                    >
                                        {/* Spotlight effect overlay */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-md"
                                            style={{
                                                background: selectedDestination.name !== dest.name
                                                    ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, transparent 70%)`
                                                    : 'none'
                                            }}
                                        />

                                        <span className="relative z-10">{dest.name}</span>

                                        {/* Animated underline */}
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[3px] bg-white"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: selectedDestination.name === dest.name ? '100%' : '0%'
                                            }}
                                            whileHover={{
                                                width: selectedDestination.name === dest.name ? '100%' : '100%',
                                                backgroundColor: selectedDestination.name === dest.name ? '#fff' : 'rgba(255,255,255,0.5)'
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeOut"
                                            }}
                                        />

                                        {/* Glow effect on active tab */}
                                        {selectedDestination.name === dest.name && (
                                            <motion.span
                                                className="absolute bottom-0 left-0 right-0 h-[3px] bg-white blur-sm"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                    </motion.button>
                                </motion.li>
                            ))}
                        </ul>

                        {/* ========================================
                            TEXT CONTENT with SMOOTH TRANSITIONS
                            ======================================== */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDestination.name}
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <motion.h2
                                    className="text-white font-bellefair text-[56px] md:text-[80px] lg:text-[100px] uppercase leading-tight mb-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    {selectedDestination.name}
                                </motion.h2>

                                <motion.p
                                    className="text-secondary font-barlow text-[15px] md:text-[16px] lg:text-[18px] leading-7 md:leading-8 max-w-xl lg:max-w-none mx-auto lg:mx-0 min-h-[85px]"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {selectedDestination.description}
                                </motion.p>

                                <motion.div
                                    className="w-full h-[1px] bg-[#383B4B] my-8 md:my-10"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                />

                                <motion.div
                                    className="flex flex-col md:flex-row gap-8 md:gap-24 justify-center lg:justify-start w-full"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <motion.div
                                        className="space-y-3"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <span className="text-secondary font-barlow text-[14px] tracking-[2.36px] uppercase block">
                                            Avg. Distance
                                        </span>
                                        <span className="text-white font-bellefair text-[28px] uppercase block">
                                            {selectedDestination.distance}
                                        </span>
                                    </motion.div>

                                    <motion.div
                                        className="space-y-3"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <span className="text-secondary font-barlow text-[14px] tracking-[2.36px] uppercase block">
                                            Est. Travel Time
                                        </span>
                                        <span className="text-white font-bellefair text-[28px] uppercase block">
                                            {selectedDestination.travel}
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
