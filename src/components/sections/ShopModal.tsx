import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ShoppingBag } from 'lucide-react';

interface ShopModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ShopModal({ isOpen, onClose }: ShopModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => { });
            }
            gsap.to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power3.out'
            });
            gsap.fromTo('.shop-stagger',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
            );
        } else {
            document.body.style.overflow = '';
            if (videoRef.current) {
                videoRef.current.pause();
            }
            gsap.to(overlayRef.current, {
                autoAlpha: 0,
                duration: 0.6,
                ease: 'power3.inOut'
            });
        }
    }, [isOpen]);

    const products = [
        {
            title: "Mung Bean Purifying Mask",
            desc: "한국 전통 녹두 추출물로 모공 속 노폐물을 부드럽게 정화하는 프리미엄 워시오프 마스크.",
            price: "₩ 85,000",
            mediaType: "video",
            src: "/ad_contents/Mung_bean_Mask.mp4"
        },
        {
            title: "Airport Exclusive Package",
            desc: "면세점 한정, 오렐라인의 베스트셀러 세럼과 크림을 담은 시그니처 트래블 패키지.",
            price: "₩ 210,000",
            mediaType: "image",
            src: "/ad_contents/airport_dutyfree_ad.jpg"
        }
    ];

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-[#1F2A24] text-[#F6F1E8] opacity-0 invisible"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md transition-colors text-white"
            >
                <X size={24} />
            </button>

            {/* Brand Ad Video Section */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden bg-black">
                <video
                    ref={videoRef}
                    src="/ad_contents/Beyond_Time.mp4"
                    muted={false}
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A24] to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1F2A24]" />

                <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 shop-stagger">
                    <span className="text-xs font-mono tracking-[0.2em] text-[#C6A756] uppercase">The Campaign</span>
                    <h2 className="text-4xl md:text-6xl font-drama mt-2 text-white">Beyond<br />Time.</h2>
                </div>
            </div>

            {/* Shop Products Section */}
            <div className="w-full md:w-1/2 h-[60vh] md:h-full overflow-y-auto px-6 py-12 md:p-20 hide-scrollbar scroll-smooth">
                <div className="max-w-md mx-auto">
                    <div className="mb-16 shop-stagger flex items-center gap-4">
                        <ShoppingBag className="text-[#C6A756]" size={28} />
                        <h2 className="text-3xl font-serif">Aureline Boutique</h2>
                    </div>

                    <div className="flex flex-col gap-16 pb-20">
                        {products.map((item, idx) => (
                            <div key={idx} className="shop-stagger group cursor-pointer">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-black/20 mb-6 relative">
                                    {item.mediaType === "video" ? (
                                        <video
                                            src={item.src}
                                            muted
                                            loop
                                            playsInline
                                            autoPlay
                                            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                                </div>

                                <h3 className="text-2xl font-serif mb-2 group-hover:text-[#C6A756] transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-white/60 font-sans leading-relaxed mb-4">
                                    {item.desc}
                                </p>
                                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                    <span className="font-mono text-sm tracking-widest">{item.price}</span>
                                    <button className="text-xs uppercase tracking-widest text-[#C6A756] hover:text-white transition-colors">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
