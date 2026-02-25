import { useEffect } from 'react';
import Lenis from 'lenis';

import { NoiseOverlay } from './components/layout/NoiseOverlay';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Philosophy } from './components/sections/Philosophy';
import { Method } from './components/sections/Method';
import { Collection } from './components/sections/Collection';

function App() {
  // Smooth Scrolling setup using Lenis (commonly used with GSAP)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-ivory text-moss font-sans selection:bg-gold/30">
      <NoiseOverlay />
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Method />
        <Collection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
