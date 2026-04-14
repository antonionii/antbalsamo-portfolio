"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";
import { applyTheme } from "./theme/tokens";

const ProjectHeader = ({ colorSchemeType, setColorSchemeType }) => {
  const router = useRouter();
  const isDark = colorSchemeType === "dark";
  const [direction, setDirection] = useState(isDark ? -1 : 1);
  const [isLight, setIsLight] = useState(!isDark);
  const animationContainer = useRef(null);
  const animRef = useRef(null);

  const startAnimation = useCallback(
    (event) => {
      if (event) event.stopPropagation();
      if (!animRef.current) return;

      animRef.current.setDirection(direction);
      animRef.current.play();

      if (direction === -1) {
        animRef.current.setSpeed(2);
        applyTheme("light");
        setColorSchemeType("light");
        setIsLight(true);
      } else {
        animRef.current.setSpeed(1);
        applyTheme("dark");
        setColorSchemeType("dark");
        setIsLight(false);
      }

      setDirection(direction * -1);
    },
    [direction, setColorSchemeType]
  );

  useEffect(() => {
    setIsLight(colorSchemeType === "light");
    const newDirection = colorSchemeType === "light" ? 1 : -1;
    if (newDirection !== direction) {
      setDirection(newDirection);
      startAnimation();
    }
  }, [colorSchemeType, direction, startAnimation]);

  useEffect(() => {
    if (!animRef.current && typeof window !== "undefined") {
      animRef.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "https://assets1.lottiefiles.com/packages/lf20_ebutdyzo.json",
      });

      if (colorSchemeType === "dark") {
        animRef.current.addEventListener("DOMLoaded", () => {
          animRef.current.goToAndStop(animRef.current.totalFrames - 1, true);
        });
      }
    }

    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, []);

  return (
    <header
      className="
        sticky top-0 z-[15] px-4 py-2
        bg-[var(--color-bg-base)]
        md:px-10 md:py-3
        xl:px-16
      "
    >
      <div className="max-w-[1100px] mx-auto w-full flex justify-between items-center">
        <ul
          className="
            flex items-center list-none flex-1 justify-between gap-8
            max-[1100px]:flex-none max-[1100px]:gap-4 max-[1100px]:w-full
          "
        >
          <li className="flex items-center list-none">
            <button
              onClick={() => router.back()}
              className="
                flex items-center justify-center
                bg-transparent border-none cursor-pointer
                text-[var(--color-text-primary)]
                p-2 rounded-full w-10 h-10 shrink-0
                transition-colors duration-200
                hover:bg-black/10
                [&_.material-symbols-outlined]:text-2xl
                md:[&_.material-symbols-outlined]:text-[1.8rem]
              "
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </li>
          <li className="flex items-center list-none h-[2.8rem]">
            <div className="flex items-center h-full">
              <div
                className="anime-contain"
                ref={animationContainer}
                onClick={startAnimation}
                style={{
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  verticalAlign: "middle",
                  marginTop: "2px",
                }}
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Decorative nav line */}
      <div className="h-1 bg-[var(--color-deco-red)] w-full absolute -top-[10%] left-0 after:content-[''] after:h-1 after:bg-[var(--color-deco-yellow)] after:w-full after:absolute after:top-full after:left-0" />
    </header>
  );
};

export default ProjectHeader;
