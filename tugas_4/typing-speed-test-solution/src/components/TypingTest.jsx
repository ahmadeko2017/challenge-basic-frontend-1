import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import data from '../data.json';
import patternConfetti from '../assets/pattern-confetti.svg';
import iconRestart from '../assets/icon-restart.svg';
import logo from '../assets/logo-large.svg';
import patternStar1 from '../assets/pattern-star-1.svg';
import patternStar2 from '../assets/pattern-star-2.svg';
import iconPersonalBest from '../assets/icon-personal-best.svg';
import iconCompleted from '../assets/icon-completed.svg';

const TypingTest = () => {
    const [difficulty, setDifficulty] = useState('easy');
    const [mode, setMode] = useState('timed'); // 'timed' | 'passage'
    const [fontSize, setFontSize] = useState('M'); // S, M, L, XL
    const [currentText, setCurrentText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, finished
    const [startTime, setStartTime] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0); // For passage mode
    const [timeLeft, setTimeLeft] = useState(60); // For timed mode
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [personalBest, setPersonalBest] = useState(0);
    const [isFirstTest, setIsFirstTest] = useState(false);
    const [isTextChanging, setIsTextChanging] = useState(false); // For smooth text transition
    const inputRef = useRef(null);

    // Font size mapping
    const fontSizeClasses = {
        'S': 'text-sm md:text-base',
        'M': 'text-base md:text-xl',
        'L': 'text-xl md:text-2xl',
        'XL': 'text-2xl md:text-3xl'
    };

    // Load Personal Best from LocalStorage
    useEffect(() => {
        const storedPB = localStorage.getItem('typing-speed-pb');
        if (storedPB) setPersonalBest(parseInt(storedPB, 10));

        // Check if user has ever completed a test
        const hasCompleted = localStorage.getItem('typing-test-completed');
        if (!hasCompleted) {
            setIsFirstTest(true);
        }
    }, []);

    // Initialize test on difficulty or mode change
    useEffect(() => {
        resetTest();
    }, [difficulty, mode]);

    // Timer logic
    useEffect(() => {
        let interval;
        if (status === 'running') {
            interval = setInterval(() => {
                const now = Date.now();
                if (mode === 'timed') {
                    const elapsed = (now - startTime) / 1000;
                    const remaining = Math.max(0, 60 - elapsed);
                    setTimeLeft(remaining);
                    if (remaining === 0) finishTest(userInput);
                } else {
                    const elapsed = (now - startTime) / 1000;
                    setTimeElapsed(elapsed);
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status, startTime, mode, userInput]);

    // Handle difficulty change with smooth text transition
    const handleDifficultyChange = useCallback((newDifficulty) => {
        if (newDifficulty === difficulty) return; // Skip if same difficulty

        setIsTextChanging(true); // Trigger fade out
        setTimeout(() => {
            setDifficulty(newDifficulty);
            const texts = data[newDifficulty];
            const randomIndex = Math.floor(Math.random() * texts.length);
            setCurrentText(texts[randomIndex].text);
            setUserInput('');
            setStatus('idle'); // Ensure status is idle to show Start button
            setTimeout(() => {
                setIsTextChanging(false); // Trigger fade in
            }, 100); // Slightly longer delay for smoother appearance
        }, 250); // Increased for better fade out
    }, [difficulty]);

    const resetTest = useCallback(() => {
        const texts = data[difficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        setCurrentText(texts[randomIndex].text);
        setUserInput('');
        setStatus('idle');
        setTimeElapsed(0);
        setTimeLeft(60);
        setWpm(0);
        setAccuracy(100);
        if (inputRef.current) inputRef.current.focus();
    }, [difficulty]);


    const handleStart = useCallback(() => {
        setStatus('running');
        setStartTime(Date.now());
        if (inputRef.current) inputRef.current.focus();
    }, []);

    // Keyboard shortcuts for accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Start test with Enter or Space when idle
            if (status === 'idle' && (e.key === 'Enter' || e.key === ' ')) {
                if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SELECT') {
                    e.preventDefault();
                    handleStart();
                }
            }
            // Reset test with Escape
            if (e.key === 'Escape' && status !== 'idle') {
                e.preventDefault();
                resetTest();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status]);

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (status === 'finished') return;

        if (status === 'idle') {
            setStatus('running');
            setStartTime(Date.now());
        }

        setUserInput(value);

        // Calculate real-time accuracy
        if (value.length > 0) {
            let correctChars = 0;
            for (let i = 0; i < value.length; i++) {
                if (value[i] === currentText[i]) correctChars++;
            }
            const acc = (correctChars / value.length) * 100;
            setAccuracy(Math.round(acc));

            // Calculate real-time WPM
            const timeSpent = mode === 'timed' ? (60 - timeLeft) : timeElapsed;
            const timeInMinutes = timeSpent / 60;
            const safeTime = timeInMinutes > 0 ? timeInMinutes : 1 / 60;
            const grossWpm = (value.length / 5) / safeTime;
            setWpm(Math.round(grossWpm));
        }

        // Check if finished
        if (value.length === currentText.length) {
            finishTest(value);
        }
    };

    const finishTest = (finalInput) => {
        setStatus('finished');

        // Calculate WPM
        const timeSpent = mode === 'timed' ? (60 - timeLeft) : timeElapsed;
        const timeInMinutes = timeSpent / 60;
        // Avoid division by zero
        const safeTime = timeInMinutes > 0 ? timeInMinutes : 1 / 60;

        const grossWpm = (finalInput.length / 5) / safeTime;
        const finalWpm = Math.round(grossWpm);
        setWpm(finalWpm);

        // Update Personal Best
        if (finalWpm > personalBest) {
            setPersonalBest(finalWpm);
            localStorage.setItem('typing-speed-pb', finalWpm.toString());
        }

        // Calculate Accuracy
        let correctChars = 0;
        for (let i = 0; i < finalInput.length; i++) {
            if (finalInput[i] === currentText[i]) correctChars++;
        }
        const acc = finalInput.length > 0 ? (correctChars / finalInput.length) * 100 : 100;
        setAccuracy(Math.round(acc));

        // Mark test as completed (for first test detection)
        if (isFirstTest) {
            localStorage.setItem('typing-test-completed', 'true');
        }
    };

    const formatTimeDisplay = () => {
        if (mode === 'timed') {
            return `0:${Math.ceil(timeLeft).toString().padStart(2, '0')}`;
        }
        const mins = Math.floor(timeElapsed / 60);
        const secs = Math.floor(timeElapsed % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative w-full max-w-7xl px-4 md:px-6 py-8 md:py-12 lg:py-20 mx-auto">
            {/* Header: Logo & Personal Best */}
            <header className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-8 md:mb-16 gap-4">
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <img src={logo} alt="Typing Speed Test" className="w-[150px] md:w-[200px]" />
                </div>
                {personalBest > 0 && (
                    <div className="flex items-center gap-2">
                        <img src={iconPersonalBest} alt="Trophy" className="w-5 md:w-6 h-5 md:h-6" />
                        <p className="text-neutral-400 text-sm md:text-base">
                            <span className="text-neutral-500">Personal best:</span>{' '}
                            <span className="text-neutral-0 font-bold">{personalBest} WPM</span>
                        </p>
                    </div>
                )}
            </header>

            {/* Toolbar & Content - Hidden when finished */}
            {status !== 'finished' && (
                <>
                    {/* Compact Stats & Controls Toolbar - ARIA live region for screen readers */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8 pb-4 border-b border-neutral-800" role="status" aria-live="polite" aria-atomic="true">
                        {/* Left: Inline Stats with Dividers */}
                        <div className="flex items-center gap-3 md:gap-6 justify-center md:justify-start text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500 text-xs md:text-sm">WPM:</span>
                                <span className="text-neutral-0 font-bold text-base md:text-xl">{wpm}</span>
                            </div>

                            {/* Vertical Divider */}
                            <div className="w-px h-4 md:h-6 bg-neutral-700"></div>

                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500 text-xs md:text-sm">Accuracy:</span>
                                <span className="text-neutral-0 font-bold text-base md:text-xl">{accuracy}%</span>
                            </div>

                            {/* Vertical Divider */}
                            <div className="w-px h-4 md:h-6 bg-neutral-700"></div>

                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500 text-xs md:text-sm">Time:</span>
                                <span className="text-neutral-0 font-bold text-base md:text-xl">{formatTimeDisplay()}</span>
                            </div>
                        </div>

                        {/* Mobile: Dropdown Controls (Shown only on mobile) */}
                        <div className="flex md:hidden flex-col gap-3">
                            {/* Difficulty Dropdown */}
                            <div className="flex items-center gap-3">
                                <label className="text-neutral-500 text-xs whitespace-nowrap min-w-[70px]">Difficulty:</label>
                                <select
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="flex-1 bg-neutral-900 border-2 border-neutral-700 text-neutral-0 rounded-lg px-3 py-2 text-sm
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600"
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>

                            {/* Mode Dropdown */}
                            <div className="flex items-center gap-3">
                                <label className="text-neutral-500 text-xs whitespace-nowrap min-w-[70px]">Mode:</label>
                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className="flex-1 bg-neutral-900 border-2 border-neutral-700 text-neutral-0 rounded-lg px-3 py-2 text-sm
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600"
                                >
                                    <option value="timed">Timed (60s)</option>
                                    <option value="passage">Passage</option>
                                </select>
                            </div>
                        </div>

                        {/* Desktop: Button Controls (Hidden on mobile) */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Difficulty */}
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500 text-sm">Difficulty:</span>
                                <div className="flex gap-2">
                                    {['Easy', 'Medium', 'Hard'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => handleDifficultyChange(level.toLowerCase())}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border-2 whitespace-nowrap
                                                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                                                ${difficulty === level.toLowerCase()
                                                    ? 'border-blue-600 text-blue-400 bg-transparent'
                                                    : 'border-neutral-700 text-neutral-400 bg-transparent hover:border-neutral-600'}`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Vertical Divider between Difficulty and Mode */}
                            <div className="w-px h-6 bg-neutral-700"></div>

                            {/* Mode */}
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500 text-sm">Mode:</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setMode('timed')}
                                        aria-label="Select Timed 60 seconds mode"
                                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border-2 whitespace-nowrap
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                                            ${mode === 'timed'
                                                ? 'border-blue-600 text-blue-400 bg-transparent'
                                                : 'border-neutral-700 text-neutral-400 bg-transparent hover:border-neutral-600'}`}
                                    >
                                        Timed (60s)
                                    </button>
                                    <button
                                        onClick={() => setMode('passage')}
                                        aria-label="Select Passage mode"
                                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border-2 whitespace-nowrap
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                                            ${mode === 'passage'
                                                ? 'border-blue-600 text-blue-400 bg-transparent'
                                                : 'border-neutral-700 text-neutral-400 bg-transparent hover:border-neutral-600'}`}
                                    >
                                        Passage
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Area Card with relative positioning */}
                    <div className={`bg-neutral-800 p-6 md:p-10 rounded-2xl shadow-xl border border-neutral-700 relative min-h-[300px] md:min-h-[400px] flex flex-col transition-colors duration-300
                        ${status === 'running' ? 'border-neutral-800' : 'border-neutral-800/50'}`}
                        onClick={() => inputRef.current?.focus()}>

                        {/* Blur overlay during text transition - Prevents flash of new text */}
                        {isTextChanging && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-2xl z-20 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-neutral-300 text-sm font-medium animate-pulse">Loading...</p>
                                </div>
                            </div>
                        )}

                        {/* Font Size Controls - Top Right */}
                        <div className="absolute top-6 right-6 z-20 flex gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFontSize(size);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border-2 whitespace-nowrap
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                                        ${fontSize === size
                                            ? 'border-blue-600 text-blue-400 bg-neutral-900'
                                            : 'border-neutral-700 text-neutral-400 bg-neutral-900 hover:border-neutral-600'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {/* Text Display - With fade transition, smooth font size change, and blur during loading */}
                        <div className={`leading-relaxed mb-4 mt-12 md:mt-6 ${fontSizeClasses[fontSize]} transition-all duration-300 ease-out ${isTextChanging ? 'opacity-0 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                            {currentText.split('').map((char, index) => {
                                let className = 'text-neutral-600';
                                if (userInput[index] === char) {
                                    className = 'text-green-500';
                                } else if (userInput[index] !== undefined) {
                                    className = 'text-red-500 underline decoration-2';
                                }
                                if (index === userInput.length && status === 'running') {
                                    return (
                                        <span key={index} className="relative">
                                            <span className={className}>{char}</span>
                                            <span className="absolute -left-[2px] top-0 w-[2px] h-full bg-yellow-400 animate-pulse"></span>
                                        </span>
                                    );
                                }
                                return <span key={index} className={className}>{char}</span>;
                            })}
                        </div>

                        {/* Start Overlay - Fluid fade out with re-animation on difficulty change */}
                        {status === 'idle' && !isTextChanging && (
                            <div
                                key={`start-overlay-${difficulty}`}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl z-10 backdrop-blur-[2px] gap-4 md:gap-6 transition-all duration-300 ease-out">
                                <button
                                    onClick={handleStart}
                                    aria-label="Start typing test"
                                    className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-blue-500 
                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                                        transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95
                                        animate-scaleIn"
                                >
                                    Start Typing Test
                                </button>
                                <p className="text-neutral-400 text-xs md:text-sm animate-fadeIn delay-100">Or click the text and start typing</p>
                            </div>
                        )}

                        {/* Hidden Input */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={handleInputChange}
                            aria-label="Typing test input. Start typing to begin."
                            className="opacity-0 absolute inset-0 cursor-default"
                            autoFocus
                        />
                    </div>
                </>
            )}

            {/* Result Screen */}
            {status === 'finished' && (
                <div className="mt-16 text-center relative">
                    <div className="max-w-2xl mx-auto relative">
                        {/* Background Pattern */}
                        <img src={patternConfetti} alt="" className="absolute -top-10 -left-10 w-32 h-32 opacity-5 pointer-events-none" />
                        <img src={patternConfetti} alt="" className="absolute -bottom-10 -right-10 w-32 h-32 opacity-5 pointer-events-none rotate-180" />

                        {/* Decorative Elements for First Test */}
                        {isFirstTest && (
                            <>
                                <div className="absolute top-24 left-12 text-red-500 text-4xl opacity-60">✦</div>
                                <div className="absolute bottom-32 right-16 text-yellow-400 text-3xl opacity-70">✦</div>
                            </>
                        )}

                        {/* Green Checkmark Icon - Only for First Test */}
                        {isFirstTest && (
                            <div className="mb-6 relative z-10 flex justify-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                                    <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Completed Icon - Centered above title */}
                        <div className="flex justify-center mb-6 md:mb-8 relative z-10">
                            <img src={iconCompleted} alt="Completed" className="w-16 md:w-20 h-16 md:h-20" />
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-5xl font-bold text-neutral-0 mb-4 md:mb-6 text-center relative z-10">
                            {isFirstTest
                                ? 'Baseline Established!'
                                : (wpm === personalBest && personalBest > 0
                                    ? 'High Score Smashed! 🎉'
                                    : 'Test Complete!')}
                        </h2>
                        <p className="text-sm md:text-base text-neutral-400 mb-8 md:mb-12 text-center max-w-xl mx-auto relative z-10">
                            {isFirstTest
                                ? "You've set the bar. Now the real challenge begins—time to beat it."
                                : (wpm === personalBest && personalBest > 0
                                    ? "You're getting faster. That was incredible typing."
                                    : "Nice work! Keep practicing to improve your speed.")}
                        </p>

                        {/* Stats Grid - Staggered animation */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10 relative z-10">
                            {/* WPM */}
                            <div className="bg-neutral-900/60 p-6 md:p-8 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border border-neutral-800/50 animate-slideUp">
                                <span className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wider">WPM:</span>
                                <span className="block text-4xl md:text-5xl font-bold text-neutral-0 animate-numberCount">{wpm}</span>
                            </div>

                            {/* Accuracy */}
                            <div className="bg-neutral-900/60 p-6 md:p-8 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border border-neutral-800/50 animate-slideUp delay-100">
                                <span className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wider">Accuracy:</span>
                                <span className={`block text-4xl md:text-5xl font-bold animate-numberCount ${accuracy === 100 ? 'text-green-500' : 'text-red-400'}`}>{accuracy}%</span>
                            </div>

                            {/* Characters */}
                            <div className="bg-neutral-900/60 p-6 md:p-8 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border border-neutral-800/50 animate-slideUp delay-200">
                                <span className="text-neutral-500 text-xs md:text-sm font-semibold tracking-wider">Characters</span>
                                <div className="block text-4xl md:text-5xl font-bold animate-numberCount">
                                    <span className="text-green-500">{userInput.length}</span>
                                    <span className="text-neutral-0">/</span>
                                    <span className="text-red-500">{userInput.split('').filter((char, i) => char !== currentText[i]).length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Personal Best Badge */}
                        {!isFirstTest && wpm === personalBest && personalBest > 0 && (
                            <div className="mb-6 md:mb-8 relative z-10 flex items-center justify-center gap-2">
                                <img src={iconPersonalBest} alt="" className="w-5 md:w-6 h-5 md:h-6" />
                                <p className="text-yellow-400 font-bold text-sm md:text-base">New Personal Best!</p>
                            </div>
                        )}

                        {/* Button - Centered */}
                        <div className="flex justify-center">
                            <button
                                onClick={resetTest}
                                className="bg-white text-neutral-950 px-6 md:px-8 py-3 rounded-lg font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-neutral-100 
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                                    transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 animate-scaleIn delay-300"
                            >
                                {isFirstTest ? 'Beat This Score' : (wpm === personalBest && personalBest > 0 ? 'Beat This Score' : 'Go Again')}
                                <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypingTest;
