export function Footer() {
    return (
        <footer className="bg-moss text-ivory/80 pt-20 pb-10 px-8 rounded-t-[3rem] mt-32 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                {/* Brand & Philosophy */}
                <div className="max-w-md">
                    <h2 className="text-4xl font-drama text-ivory mb-6">AURELINE</h2>
                    <p className="text-sm leading-relaxed text-ivory/60 font-sans pr-8">
                        Aureline — a Seoul-born luxury botanical skincare house transforming daily skincare into a gold-lit ritual of precision and radiance.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-16 text-sm uppercase tracking-widest">
                    <div className="flex flex-col gap-4">
                        <span className="text-gold mb-2 text-xs">Explore</span>
                        <a href="#philosophy" className="hover:text-ivory transition-colors">Philosophy</a>
                        <a href="#collection" className="hover:text-ivory transition-colors">Collection</a>
                        <a href="#atelier" className="hover:text-ivory transition-colors">Atelier Access</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-gold mb-2 text-xs">Legal</span>
                        <a href="#" className="hover:text-ivory transition-colors">Privacy</a>
                        <a href="#" className="hover:text-ivory transition-colors">Terms</a>
                        <a href="#" className="hover:text-ivory transition-colors">Contact</a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-ivory/40">
                <p>© {new Date().getFullYear()} Aureline Seoul. All rights reserved.</p>

                <div className="flex items-center gap-2">
                    <span>System Operational</span>
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                </div>
            </div>
        </footer>
    );
}
