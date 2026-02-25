import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "outline" | "ghost";
}

export function MagneticButton({
    children,
    className,
    variant = "primary",
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;

        if (!button || !text) return;

        let xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        let yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        let textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        let textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.2);
            yTo(y * 0.2);
            textXTo(x * 0.1);
            textYTo(y * 0.1);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);

            gsap.to(button, {
                scale: 1,
                duration: 0.6,
                ease: "power3.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale: 1.03,
                duration: 0.6,
                ease: "power3.out"
            });
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
        button.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
            button.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    const variants = {
        primary: "bg-moss text-ivory border border-transparent shadow-[0_4px_20px_rgba(31,42,36,0.15)]",
        outline: "bg-transparent text-moss border border-moss/20 hover:border-moss",
        ghost: "bg-transparent text-moss hover:bg-moss/5"
    };

    return (
        <button
            ref={buttonRef}
            className={cn(
                "relative flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-colors duration-300 overflow-hidden",
                variants[variant],
                className
            )}
            {...props}
        >
            <span ref={textRef} className="relative z-10 block pointer-events-none">
                {children}
            </span>
            {variant === "primary" && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
        </button>
    );
}
