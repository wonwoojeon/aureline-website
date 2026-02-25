import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '../../utils/cn';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            if (scrollPos > 50 && !isScrolled) {
                setIsScrolled(true);
            } else if (scrollPos <= 50 && isScrolled) {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(navRef.current, {
                backgroundColor: isScrolled ? 'rgba(246, 241, 232, 0.8)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                scale: isScrolled ? 1 : 0.98,
                y: isScrolled ? 0 : 20,
                duration: 0.6,
                ease: 'power2.inOut',
            });
        });
        return () => ctx.revert();
    }, [isScrolled]);

    return (
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-center w-full px-4 pt-4 sm:pt-6 pointer-events-none">
            <nav
                ref={navRef}
                className={cn(
                    "flex items-center justify-between w-full max-w-5xl px-6 py-4 transition-colors duration-500 rounded-full pointer-events-auto",
                )}
            >
                <div className="text-xl font-drama tracking-wider text-moss">AURELINE</div>

                <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
                    <a href="#philosophy" className="hover:text-gold transition-colors">Philosophy</a>
                    <a href="#collection" className="hover:text-gold transition-colors">Collection</a>
                    <a href="#atelier" className="hover:text-gold transition-colors">Atelier</a>
                </div>

                <button className="text-sm uppercase tracking-widest border border-moss/20 px-4 py-2 rounded-full hover:bg-moss hover:text-ivory transition-all duration-300">
                    Shop
                </button>
            </nav>
        </div>
    );
}
