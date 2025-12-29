import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const exploreRef = useRef(null);

    const handleExploreClick = (e) => {
        e.preventDefault();
        navigate('/challenge-basic-frontend-1/destination');
    };

    // Track mouse position for spotlight effect
    const handleMouseMove = (e) => {
        if (!exploreRef.current) return;
        const rect = exploreRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    // ========================================
    // ANIMATION VARIANTS
    // ========================================

    // Container for staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    // Text items entrance from left
    const textItemVariants = {
        hidden: {
            opacity: 0,
            x: -50,
            scale: 0.9,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    // Explore button entrance from right
    const exploreVariants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
            rotate: -180,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                delay: 0.5
            }
        }
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-6 pt-6 lg:pt-12 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-0 pb-12 lg:pb-24 min-h-[calc(100vh-200px)] overflow-hidden">

            {/* ========================================
                IDLE BACKGROUND ANIMATIONS (Optimized)
                ======================================== */}

            {/* Floating Atmospheric Orbs */}
            <motion.div
                className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: [0, 80, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none"
                animate={{
                    x: [0, -60, 0],
                    y: [0, 70, 0],
                    scale: [1, 1.25, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />
            <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none"
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* ========================================
                MAIN CONTENT with STAGGERED ENTRANCE
                ======================================== */}
            <motion.div
                className="flex-1 text-center lg:text-left space-y-6 lg:pl-16 z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h5
                    className="text-secondary font-barlow text-[16px] md:text-[20px] lg:text-[28px] uppercase tracking-[2.7px] md:tracking-[3.38px] lg:tracking-[4.72px]"
                    variants={textItemVariants}
                >
                    So, you want to travel to
                </motion.h5>

                <motion.h1
                    className="text-white font-bellefair text-[80px] md:text-[150px] uppercase leading-none"
                    variants={textItemVariants}
                >
                    Space
                </motion.h1>

                <motion.p
                    className="text-secondary font-barlow text-[15px] md:text-[16px] lg:text-[18px] leading-relaxed max-w-md mx-auto lg:mx-0"
                    variants={textItemVariants}
                >
                    Let's face it; if you want to go to space, you might as well genuinely go to outer
                    space and not hover kind of on the edge of it. Well sit back, and relax because we'll
                    give you a truly out of this world experience!
                </motion.p>
            </motion.div>

            {/* ========================================
                EXPLORE BUTTON with ORBITING PLANETS/SATELLITES
                ======================================== */}
            <motion.div
                className="lg:justify-self-end pt-12 lg:pt-0 relative z-10"
                variants={exploreVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Central container for orbiting elements */}
                <div className="relative w-36 h-36 md:w-60 md:h-60 lg:w-[274px] lg:h-[274px]">

                    {/* ORBITING PLANETS/SATELLITES */}

                    {/* Orbit 1 - Inner ring (radius: 90px) - Atomic style */}
                    <motion.div
                        className="absolute w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg shadow-orange-500/50"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginLeft: '-20px',
                            marginTop: '-20px',
                        }}
                        animate={{
                            x: [0, 64, 90, 64, 0, -64, -90, -64, 0],
                            y: [90, 64, 0, -64, -90, -64, 0, 64, 90],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-orange-400 blur-md"
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                    </motion.div>

                    {/* Orbit 2 - Inner ring opposite (radius: 90px) - Atomic style */}
                    <motion.div
                        className="absolute w-5 h-5 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginLeft: '-16px',
                            marginTop: '-16px',
                        }}
                        animate={{
                            x: [0, -64, -90, -64, 0, 64, 90, 64, 0],
                            y: [-90, -64, 0, 64, 90, 64, 0, -64, -90],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 rounded-full bg-cyan-400 blur-md"
                            animate={{
                                opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                    </motion.div>

                    {/* Orbit 3 - Outer ring: MOON (natural satellite) */}
                    <motion.div
                        className="absolute w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-xl shadow-gray-700/50"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginLeft: '-16px',
                            marginTop: '-16px',
                        }}
                        animate={{
                            x: [
                                160,      // 0°
                                157,      // 11.25°
                                148,      // 22.5°
                                134,      // 33.75°
                                113,      // 45°
                                89,       // 56.25°
                                65,       // 67.5°
                                33,       // 78.75°
                                0,        // 90°
                                -33,      // 101.25°
                                -65,      // 112.5°
                                -89,      // 123.75°
                                -113,     // 135°
                                -134,     // 146.25°
                                -148,     // 157.5°
                                -157,     // 168.75°
                                -160,     // 180°
                                -157,     // 191.25°
                                -148,     // 202.5°
                                -134,     // 213.75°
                                -113,     // 225°
                                -89,      // 236.25°
                                -65,      // 247.5°
                                -33,      // 258.75°
                                0,        // 270°
                                33,       // 281.25°
                                65,       // 292.5°
                                89,       // 303.75°
                                113,      // 315°
                                134,      // 326.25°
                                148,      // 337.5°
                                157,      // 348.75°
                                160       // 360°
                            ],
                            y: [
                                0,        // 0°
                                31,       // 11.25°
                                62,       // 22.5°
                                89,       // 33.75°
                                113,      // 45°
                                134,      // 56.25°
                                148,      // 67.5°
                                157,      // 78.75°
                                160,      // 90°
                                157,      // 101.25°
                                148,      // 112.5°
                                134,      // 123.75°
                                113,      // 135°
                                89,       // 146.25°
                                62,       // 157.5°
                                31,       // 168.75°
                                0,        // 180°
                                -31,      // 191.25°
                                -62,      // 202.5°
                                -89,      // 213.75°
                                -113,     // 225°
                                -134,     // 236.25°
                                -148,     // 247.5°
                                -157,     // 258.75°
                                -160,     // 270°
                                -157,     // 281.25°
                                -148,     // 292.5°
                                -134,     // 303.75°
                                -113,     // 315°
                                -89,      // 326.25°
                                -62,      // 337.5°
                                -31,      // 348.75°
                                0         // 360°
                            ],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Moon surface with craters */}
                        <div className="relative w-full h-full">
                            {/* Main moon body */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500" />

                            {/* Craters (small dark circles) */}
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-gray-600/60 rounded-full" />
                            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-600/50 rounded-full" />
                            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-700/40 rounded-full" />
                            <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-gray-600/55 rounded-full" />
                            <div className="absolute bottom-1/4 right-1/4 w-1 h-1 md:w-1 md:h-1 bg-gray-700/45 rounded-full" />

                            {/* Soft glow around moon */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white/20 blur-sm"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Perfect circular orbital paths (atomic model) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] md:w-[260px] md:h-[260px] border border-white/10 rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[380px] md:h-[380px] border border-white/10 rounded-full pointer-events-none" />

                    {/* ========================================
                        EXPLORE BUTTON with SPOTLIGHT EFFECT
                        ======================================== */}
                    <motion.a
                        ref={exploreRef}
                        href="#destination"
                        onClick={handleExploreClick}
                        onMouseMove={handleMouseMove}
                        className="absolute inset-0 bg-white rounded-full flex items-center justify-center
                            text-primary font-bellefair text-[20px] md:text-[32px] uppercase tracking-widest
                            cursor-pointer overflow-hidden group shadow-2xl shadow-white/20"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 80px rgba(255,255,255,0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17
                        }}
                    >
                        {/* Spotlight effect following mouse */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.2) 0%, transparent 70%)`
                            }}
                        />

                        {/* Expanding ring on hover */}
                        <motion.span
                            className="absolute inset-0 rounded-full bg-white/10"
                            initial={{ scale: 1, opacity: 0 }}
                            whileHover={{ scale: 2.5, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Breathing glow effect */}
                        <motion.span
                            className="absolute inset-0 rounded-full"
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(255,255,255,0.2)",
                                    "0 0 40px rgba(255,255,255,0.4)",
                                    "0 0 20px rgba(255,255,255,0.2)"
                                ]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Text */}
                        <span className="relative z-10">Explore</span>
                    </motion.a>
                </div>
            </motion.div>
        </div>
    );
}
