import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import data from '../data.json';

export default function Crew() {
    const [selectedCrew, setSelectedCrew] = useState(data.crew[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const dotRefs = useRef([]);

    // Smooth mouse tracking for spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // ========================================
    // ANIMATION VARIANTS
    // ========================================

    // Container for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    // Crew image animations with blur
    const crewImageVariants = {
        enter: {
            opacity: 0,
            y: 50,
            scale: 0.9,
            filter: "blur(10px)"
        },
        center: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.9,
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

    // Dot button hover variants with magnetic effect
    const dotVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.3,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { scale: 0.9 }
    };

    // ========================================
    // HANDLERS
    // ========================================

    const handleCrewChange = (crew) => {
        if (crew.name === selectedCrew.name) return;

        setIsAnimating(true);
        setTimeout(() => {
            setSelectedCrew(crew);
            setIsAnimating(false);
        }, 350);
    };

    // Spotlight effect on dots
    const handleMouseMove = (e, index) => {
        const dot = dotRefs.current[index];
        if (!dot) return;

        const rect = dot.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-6 pt-6 lg:pt-12 text-center lg:text-left h-full flex flex-col overflow-hidden">

            {/* ========================================
                IDLE BACKGROUND ANIMATIONS (Optimized - 3 orbs only)
                ======================================== */}

            {/* Floating Atmospheric Orbs */}
            <motion.div
                className="absolute top-10 -left-20 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 60, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            <motion.div
                className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-500/6 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 16,
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
                className="flex flex-col h-full"
            >
                {/* Title */}
                <motion.h5
                    className="text-white text-[16px] md:text-[20px] lg:text-[28px] uppercase tracking-[2.7px] md:tracking-[3.38px] lg:tracking-[4.72px] font-barlow mb-8 md:mb-16 md:text-left md:pl-10"
                    variants={itemVariants}
                >
                    <span className="opacity-25 font-bold mr-4">02</span> Meet your crew
                </motion.h5>

                <div className="flex flex-col-reverse lg:flex-row-reverse lg:items-end lg:justify-between w-full flex-grow">

                    {/* ========================================
                        CREW IMAGE with FLOATING ANIMATION
                        ======================================== */}
                    <motion.div
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end border-b border-[#383B4B] lg:border-none mt-8 lg:mt-0"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCrew.name}
                                variants={crewImageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="relative"
                            >
                                {/* Subtle glow behind crew member */}
                                <motion.div
                                    className="absolute inset-0 -bottom-10"
                                    style={{
                                        background: 'radial-gradient(ellipse at bottom, rgba(99, 102, 241, 0.15) 0%, transparent 60%)',
                                        filter: 'blur(30px)',
                                    }}
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Crew image with subtle float */}
                                <motion.img
                                    src={selectedCrew.images.png}
                                    alt={selectedCrew.name}
                                    className="h-[223px] md:h-[572px] lg:h-[712px] object-contain relative z-10"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{
                                        scale: 1.02,
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
                        className="flex flex-col-reverse lg:flex-col lg:w-1/2 lg:pb-24 lg:pl-10"
                        variants={itemVariants}
                    >
                        {/* ========================================
                            DOT NAVIGATION with SPOTLIGHT EFFECT
                            ======================================== */}
                        <motion.div
                            className="flex justify-center lg:justify-start gap-6 py-8 lg:py-0 lg:mt-24"
                            variants={itemVariants}
                        >
                            {data.crew.map((crewMember, index) => (
                                <motion.button
                                    key={crewMember.name}
                                    ref={el => dotRefs.current[index] = el}
                                    onClick={() => handleCrewChange(crewMember)}
                                    variants={dotVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onMouseMove={(e) => handleMouseMove(e, index)}
                                    aria-label={`Select ${crewMember.name}`}
                                    className={`relative w-[15px] h-[15px] rounded-full transition-all duration-300 overflow-hidden ${selectedCrew.name === crewMember.name
                                            ? 'bg-white shadow-lg shadow-white/50'
                                            : 'bg-white/17 hover:bg-white/50'
                                        }`}
                                >
                                    {/* Spotlight gradient overlay */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{
                                            background: selectedCrew.name !== crewMember.name
                                                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4) 0%, transparent 70%)`
                                                : 'none'
                                        }}
                                    />

                                    {/* Ripple effect on active dot */}
                                    {selectedCrew.name === crewMember.name && (
                                        <motion.span
                                            className="absolute inset-0 rounded-full bg-white"
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeOut"
                                            }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* ========================================
                            TEXT CONTENT with SMOOTH TRANSITIONS
                            ======================================== */}
                        <motion.div
                            className="flex flex-col items-center lg:items-start lg:mb-auto"
                            variants={itemVariants}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCrew.name}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <motion.h4
                                        className="text-white/50 font-bellefair text-[16px] md:text-[24px] lg:text-[32px] uppercase mb-2 md:mb-4 mt-8 md:mt-12 lg:mt-0"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {selectedCrew.role}
                                    </motion.h4>

                                    <motion.h3
                                        className="text-white font-bellefair text-[24px] md:text-[40px] lg:text-[56px] uppercase mb-4 md:mb-6 whitespace-nowrap"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {selectedCrew.name}
                                    </motion.h3>

                                    <motion.p
                                        className="text-secondary font-barlow text-[15px] md:text-[16px] lg:text-[18px] leading-relaxed max-w-lg mx-auto lg:mx-0 min-h-[100px] lg:min-h-[160px]"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {selectedCrew.bio}
                                    </motion.p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
}
