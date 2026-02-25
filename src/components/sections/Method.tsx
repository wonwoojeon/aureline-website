import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Botanical Extraction",
        korTitle: "식물성 추출",
        desc: "엄선된 한국의 희귀 식물에서 고순도 활성 성분을 추출합니다.",
        img: "https://images.unsplash.com/photo-1595981267035-7b04d84b4f1c?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "Clinical Precision",
        korTitle: "임상적 정밀함",
        desc: "피부 장벽 깊숙이 유효 성분을 전달하는 마이크로 테크놀로지.",
        img: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2600&auto=format&fit=crop",
    },
    {
        title: "Ritual Application",
        korTitle: "리추얼 어플리케이션",
        desc: "손끝에서 피어나는 온기와 향기로 완성되는 하루의 결실.",
        img: "https://images.unsplash.com/photo-1542272454-fa9ba1c9c7e0?q=80&w=2574&auto=format&fit=crop",
    },
];

export function Method() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".method-card");

        const ctx = gsap.context(() => {
            cards.forEach((card, index) => {
                // Stacking effect
                ScrollTrigger.create({
                    trigger: card,
                    start: `top ${100 + index * 40}px`, // pin at staggered heights
                    endTrigger: containerRef.current,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                });

                // Content reveal within each card
                gsap.fromTo(
                    card.querySelectorAll('.reveal-element'),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top center",
                            toggleActions: "play none none reverse"
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-32 px-6 w-full max-w-7xl mx-auto relative z-10">
            <div className="mb-24 md:mb-40 flex flex-col md:flex-row justify-between items-end gap-10">
                <h2 className="text-5xl md:text-7xl font-drama text-moss">
                    The Aureline<br />Method
                </h2>
                <p className="text-moss/60 max-w-md font-sans text-sm md:text-base pr-8 md:pr-0">
                    시간과 정성을 들여 완성되는 오렐라인만의 세 단계 리추얼은 피부 본연의 힘을 기르고 깊은 광채를 선사합니다.
                </p>
            </div>

            <div className="relative flex flex-col gap-12 pb-32">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "method-card sticky w-full shrink-0 flex flex-col md:flex-row h-[70vh] md:h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl origin-top",
                            idx === 0 ? "bg-moss text-ivory top-[100px] z-[1]" :
                                idx === 1 ? "bg-gold text-moss top-[140px] z-[2]" :
                                    "bg-[#2B2B2B] text-ivory top-[180px] z-[3]"
                        )}
                    >
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-110"
                                style={{ backgroundImage: `url(${step.img})` }}
                            />
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center gap-6">
                            <span className="reveal-element text-sm font-mono tracking-[0.3em] uppercase opacity-70">
                                Phase 0{idx + 1}
                            </span>

                            <h3 className="reveal-element text-4xl md:text-5xl font-drama mt-4">
                                {step.korTitle}
                            </h3>

                            <h4 className="reveal-element text-lg font-serif opacity-90 -mt-2">
                                {step.title}
                            </h4>

                            <p className="reveal-element font-sans opacity-70 leading-relaxed max-w-sm mt-4">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
