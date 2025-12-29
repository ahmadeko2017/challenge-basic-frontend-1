import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { number: '00', text: 'HOME', path: '/' },
        { number: '01', text: 'DESTINATION', path: '/destination' },
        { number: '02', text: 'CREW', path: '/crew' },
        { number: '03', text: 'TECHNOLOGY', path: '/technology' }
    ];

    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-0 lg:pt-10">
            <div className="pl-6 md:pl-10">
                <img src="/challenge-basic-frontend-1/tugas-5/assets/shared/logo.svg" alt="Space Tourism" className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <div className="hidden lg:block h-[1px] bg-white/25 w-1/3 absolute left-36 z-10"></div>

            {/* Hamburger Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative z-50 p-2"
                aria-label="Toggle Menu"
            >
                <img
                    src={isOpen
                        ? "/challenge-basic-frontend-1/tugas-5/assets/shared/icon-close.svg"
                        : "/challenge-basic-frontend-1/tugas-5/assets/shared/icon-hamburger.svg"
                    }
                    alt="Menu"
                />
            </button>

            {/* Desktop / Tablet Menu */}
            <div className="hidden md:block backdrop-blur-xl bg-white/5 md:pr-10">
                <ul className="flex gap-8 md:gap-10 px-10 md:px-12 lg:px-24">
                    {navItems.map((item) => (
                        <li key={item.text} className="h-24 flex items-center">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 h-full border-b-[3px] transition-colors nav-text uppercase tracking-widest text-white ${isActive ? 'border-white' : 'border-transparent hover:border-white/50'
                                    }`
                                }
                            >
                                <span className="font-bold hidden md:block">{item.number}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu Sidebar */}
            <div className={`fixed inset-y-0 right-0 z-40 w-[70%] bg-[#0B0D17]/15 backdrop-blur-2xl transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col gap-8 mt-28 pl-8">
                    {navItems.map((item) => (
                        <li key={item.text} className="w-full">
                            <NavLink
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 py-2 border-r-[4px] transition-colors nav-text uppercase tracking-widest text-white ${isActive ? 'border-white' : 'border-transparent'
                                    }`
                                }
                            >
                                <span className="font-bold w-5">{item.number}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
