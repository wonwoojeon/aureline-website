import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
    const textRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background Image Reveal
            gsap.fromTo(
                '.philosophy-bg',
                { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 2.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 1,
                    }
                }
            );

            // Word-by-word reveal
            if (textRef.current) {
                const words = gsap.utils.toArray('.reveal-word');
                gsap.fromTo(
                    words,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const text1 = "스킨케어는 종종 '교정'으로 여겨집니다.";
    const text2 = "하지만 우리는 이를 '리추얼'로 대합니다.";

    return (
        <section
            ref={containerRef}
            id="philosophy"
            className="relative min-h-[90vh] py-32 flex items-center justify-center overflow-hidden"
        >
            {/* Background Image - Silk Fabric Texture */}
            <div
                className="philosophy-bg absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1542272454-fa9ba1c9c7e0?q=80&w=2574&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-moss/90 mix-blend-multiply" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-sm font-mono tracking-[0.3em] text-gold/80 mb-16 uppercase relative inline-block">
                    The Manifesto
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gold/50" />
                </h2>

                <div ref={textRef} className="flex flex-col gap-6 md:gap-10">
                    <p className="text-3xl md:text-5xl lg:text-6xl font-sans font-light text-ivory/60 leading-tight">
                        {text1.split(' ').map((word, i) => (
                            <span key={`w1-${i}`} className="reveal-word inline-block mr-[0.25em]">
                                {word}
                            </span>
                        ))}
                    </p>
                    <p className="text-4xl md:text-6xl lg:text-7xl text-gold font-drama leading-tight">
                        {text2.split(' ').map((word, i) => (
                            <span key={`w2-${i}`} className="reveal-word inline-block mr-[0.25em]">
                                {word}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
}
