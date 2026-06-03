"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapEffects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const contexts = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal='clip']").forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 78%"
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    });

    return () => contexts.revert();
  }, []);

  return null;
}
