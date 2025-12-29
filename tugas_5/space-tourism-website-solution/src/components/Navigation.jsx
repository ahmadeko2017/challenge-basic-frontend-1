import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className="flex justify-between items-center p-6 md:p-0 lg:pt-10">
            <div className="pl-6 md:pl-10">
                <img src="/challenge-basic-frontend-1/assets/shared/logo.svg" alt="Space Tourism" className="w-10 h-10 md:w-12 md:h-12" />
            </div>

            <div className="hidden lg:block h-[1px] bg-white/25 w-1/3 absolute left-36 z-10"></div>

            <div className="backdrop-blur-xl bg-white/5 md:pr-10">
                <ul className="flex gap-8 md:gap-10 px-10 md:px-12 lg:px-24">
                    {[
                        { number: '00', text: 'HOME', path: '/' },
                        { number: '01', text: 'DESTINATION', path: '/destination' },
                        { number: '02', text: 'CREW', path: '/crew' },
                        { number: '03', text: 'TECHNOLOGY', path: '/technology' }
                    ].map((item) => (
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
        </nav>
    );
}
