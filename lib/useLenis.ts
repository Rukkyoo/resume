'use client'

import { useEffect, useRef } from 'react'
import  Lenis  from 'lenis'

export function useLenis() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  const scrollToSection = (ref: any) => {
    if (ref && ref.current) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(ref.current, { offset: -80 });
      } else {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { scrollToSection };
}