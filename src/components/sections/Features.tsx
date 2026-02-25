import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Activity, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Alchemy display state
    const [activePanel, setActivePanel] = useState(0);
    const panels = ['Botanical', 'Clinical', 'Active'];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background shift on scroll
            gsap.to(sectionRef.current, {
                backgroundColor: '#1F2A24', // Moss
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                },
            });

            // Card Stagger in
            gsap.fromTo(
                '.feature-card',
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.cards-container',
                        start: 'top 70%',
                    },
                }
            );

            // Panel cycling logic
            const interval = setInterval(() => {
                setActivePanel((prev) => (prev + 1) % 3);
            }, 3000);

            // Cursor blink
            gsap.to('.signal-cursor', {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: 0.6,
                ease: 'steps(1)',
            });

            return () => clearInterval(interval);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-32 px-6 md:px-12 w-full min-h-screen relative overflow-hidden text-ivory transition-colors duration-1000"
            id="features"
        >
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-sm font-mono tracking-[0.2em] text-gold mb-4 uppercase">
                        The Sensory Artifacts
                    </h2>
                    <p className="text-4xl md:text-5xl font-drama max-w-2xl leading-tight">
                        피부 본연의 빛을 깨우는 세 가지 리추얼 요소.
                    </p>
                </div>

                <div className="cards-container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                    {/* Card 1 — Ingredient Alchemy */}
                    <div className="feature-card aspect-[4/5] bg-ivory/5 border border-ivory/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-ivory/10 transition-colors duration-500">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform duration-500">
                                <Droplets size={20} />
                            </div>
                            <h3 className="text-2xl font-serif mb-2">성분 연금술</h3>
                            <p className="text-sm text-ivory/60 font-mono tracking-wide">Ingredient Alchemy</p>
                        </div>

                        <div className="relative h-32 flex items-center justify-center border-t border-ivory/10 pt-6">
                            <div className="w-full flex justify-between items-end gap-2">
                                {panels.map((panel, idx) => (
                                    <div key={panel} className="flex-1 flex flex-col gap-2 relative">
                                        <div
                                            className={`h-1 w-full rounded-full transition-all duration-1000 ${idx === activePanel ? 'bg-gold opacity-100' : 'bg-ivory/20 opacity-40'
                                                }`}
                                        />
                                        <span className={`text-[10px] uppercase tracking-widest transition-opacity duration-1000 text-center ${idx === activePanel ? 'text-gold' : 'text-ivory/40'
                                            }`}>
                                            {panel}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card 2 — Skin State Signal */}
                    <div className="feature-card aspect-[4/5] bg-moss border border-ivory/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative shadow-[inset_0_4px_40px_rgba(0,0,0,0.3)]">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-serif mb-2 text-gold">피부 상태 시그널</h3>
                                <p className="text-sm text-ivory/40 font-mono tracking-wide">Skin State Signal</p>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-ivory/10 flex items-center justify-center mb-6 text-ivory/40">
                                <Activity size={20} />
                            </div>
                        </div>

                        <div className="font-mono text-xs text-gold/80 leading-relaxed bg-black/40 p-4 rounded-xl border border-gold/10 relative overflow-hidden h-40">
                            <div className="flex justify-between w-full mb-3 pb-2 border-b border-gold/10">
                                <span>HYDRATION_IDX</span>
                                <span className="text-ivory">0.92</span>
                            </div>
                            <div className="flex justify-between w-full mb-3 pb-2 border-b border-gold/10">
                                <span>BARRIER_STR</span>
                                <span className="text-ivory">INTACT</span>
                            </div>
                            <div className="flex justify-between w-full mb-3">
                                <span>VITALITY_SIG</span>
                                <span className="text-ivory flex items-center">
                                    SYNCING <span className="signal-cursor inline-block w-2 h-3 bg-gold ml-1"></span>
                                </span>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent translate-y-20 opacity-30 shadow-[0_0_10px_#C6A756] animate-[scan_3s_linear_infinite]"></div>
                        </div>
                    </div>

                    {/* Card 3 — Ritual Sequence Timeline */}
                    <div className="feature-card aspect-[4/5] bg-ivory/5 border border-ivory/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:bg-ivory/10 transition-colors duration-500">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full shadow-[0_0_20px_rgba(198,167,86,0.3)] flex items-center justify-center mb-6 text-gold group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
                                <Sparkles size={20} />
                            </div>
                            <h3 className="text-2xl font-serif mb-2">리추얼 시퀀스</h3>
                            <p className="text-sm text-ivory/60 font-mono tracking-wide">Ritual Sequence</p>
                        </div>

                        <div className="relative h-40 flex flex-col justify-around text-xs font-mono pl-6 border-l border-ivory/20">
                            <div className="relative">
                                <div className="absolute -left-[29px] w-2 h-2 bg-gold rounded-full ring-4 ring-[#1F2A24]" />
                                <span className="text-gold tracking-widest uppercase">01. Awaken</span>
                                <p className="text-ivory/50 mt-1">Botanical preparation</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[29px] w-2 h-2 bg-ivory/40 rounded-full ring-4 ring-[#1F2A24]" />
                                <span className="text-ivory/80 tracking-widest uppercase">02. Infuse</span>
                                <p className="text-ivory/40 mt-1">Clinical active delivery</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[29px] w-2 h-2 bg-ivory/40 rounded-full ring-4 ring-[#1F2A24]" />
                                <span className="text-ivory/80 tracking-widest uppercase">03. Seal</span>
                                <p className="text-ivory/40 mt-1">Golden radiance lock</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
