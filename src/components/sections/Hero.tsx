import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MagneticButton } from '../ui/MagneticButton';
import { ArrowDown } from 'lucide-react';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Image Reveal
            gsap.fromTo(
                '.hero-bg',
                { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out' }
            );

            // Typography Stagger
            if (textRef.current) {
                const lines = gsap.utils.toArray('.hero-line');
                gsap.fromTo(
                    lines,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: 'power4.out',
                        delay: 0.5
                    }
                );
            }

            // CTA reveal
            gsap.fromTo(
                '.hero-cta',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
            );

            // Scroll Indicator Float
            gsap.to('.scroll-indicator', {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: 'power1.inOut',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-20 px-8 md:px-16"
        >
            {/* Background Image - Golden Skincare Macro */}
            <div
                className="hero-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2600&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-moss/60 via-moss/20 to-transparent mix-blend-multiply" />
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-drama text-ivory leading-[1.1] tracking-tight">
                    <div className="overflow-hidden">
                        <span className="hero-line block">리추얼,</span>
                    </div>
                    <div className="overflow-hidden">
                        <span className="hero-line block">그것이 곧 광채.</span>
                    </div>
                </h1>

                <div className="hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <MagneticButton>
                        오렐라인 리추얼 경험하기
                    </MagneticButton>
                    <p className="text-ivory/80 font-mono text-sm uppercase tracking-widest max-w-xs">
                        Botanical Extraction meets Clinical Precision
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-8 md:right-16 z-10 flex flex-col items-center gap-4 text-ivory/60">
                <span className="scroll-indicator border border-ivory/20 rounded-full p-2">
                    <ArrowDown size={16} />
                </span>
            </div>
        </section>
    );
}
