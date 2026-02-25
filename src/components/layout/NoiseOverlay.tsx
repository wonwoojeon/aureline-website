export function NoiseOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-[100vh] w-[100vw]">
            <svg className="h-full w-full opacity-[0.05]">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
