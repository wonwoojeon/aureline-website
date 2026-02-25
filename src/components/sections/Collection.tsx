import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

const collections = [
    {
        title: "Essential Glow",
        category: "Radiance Serum Collection",
        desc: "고농축 식물성 활성 성분이 피부 본연의 투명한 광채를 깨우는 첫 단계 세럼 기초 라인.",
        image: "/collection_essential.png",
    },
    {
        title: "Golden Ritual Set",
        category: "Golden Ritual Cream Line",
        desc: "피부 장벽 강화와 깊은 보습감으로 황금빛 광채를 완성하는 오렐라인의 시그니처 크림 라인.",
        highlight: true,
        image: "/collection_golden.png",
        action: "openAd",
    },
    {
        title: "Atelier Access",
        category: "Atelier Treatment Ampoules",
        desc: "집중적인 피부 컨디션 회복을 위한 고효능 앰플 클리닉 프로그램.",
        image: "/collection_atelier.png",
    }
];

export function Collection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [adOpen, setAdOpen] = useState(false);

    useEffect(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".collection-card");

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cards,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="collection" ref={containerRef} className="py-32 px-6 w-full max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
                <h2 className="text-sm font-mono tracking-[0.2em] text-moss/60 mb-6 uppercase">
                    Curated For You
                </h2>
                <h3 className="text-4xl md:text-6xl font-drama text-moss mb-8">
                    당신만을 위한 리추얼 세트
                </h3>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {collections.map((item, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "collection-card p-8 flex flex-col justify-between rounded-[2rem] border transition-all duration-500 overflow-hidden",
                                item.highlight
                                    ? "bg-moss text-ivory border-moss scale-100 lg:scale-[1.05] z-10 relative shadow-[0_20px_50px_rgba(31,42,36,0.3)]"
                                    : "bg-transparent text-moss border-moss/10 hover:border-moss/30"
                            )}
                        >
                            <div>
                                <div className="w-full aspect-[4/3] mb-8 rounded-xl overflow-hidden bg-black/5 relative group">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop';
                                        }}
                                    />
                                </div>

                                <span className={cn(
                                    "text-xs font-mono tracking-widest uppercase mb-4 block",
                                    item.highlight ? "text-gold" : "text-moss/50"
                                )}>
                                    {item.category}
                                </span>

                                <h4 className="text-2xl md:text-3xl font-serif mb-6 leading-snug">
                                    {item.title}
                                </h4>

                                <p className={cn(
                                    "text-sm font-sans leading-relaxed",
                                    item.highlight ? "text-ivory/80" : "text-moss/70"
                                )}>
                                    {item.desc}
                                </p>
                            </div>

                            <div className="mt-12">
                                <button
                                    onClick={() => {
                                        if (item.action === "openAd") setAdOpen(true);
                                    }}
                                    className={cn(
                                        "w-full py-4 text-xs font-mono uppercase tracking-widest rounded-full transition-colors",
                                        item.highlight
                                            ? "bg-gold text-moss hover:bg-ivory hover:text-moss"
                                            : "bg-transparent border border-moss/20 hover:bg-moss/5"
                                    )}>
                                    자세히 보기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ad Modal */}
            {adOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <button
                        onClick={() => setAdOpen(false)}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                    >
                        <X size={24} />
                    </button>
                    <div className="max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl relative">
                        <img
                            src="/ad_contents/airport_dutyfree_ad.jpg"
                            alt="Airport Duty Free Ad"
                            className="w-full h-auto max-h-[90vh] object-contain bg-black"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
