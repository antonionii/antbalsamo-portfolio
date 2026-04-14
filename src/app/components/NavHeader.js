"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import lottie from "lottie-web";
import { applyTheme } from "./theme/tokens";

const NavHeader = ({ colorSchemeType, setColorSchemeType }) => {
  const pathname = usePathname();
  const isDark = colorSchemeType === "dark";
  const [direction, setDirection] = useState(isDark ? -1 : 1);
  const [isLight, setIsLight] = useState(!isDark);
  const [activeItem, setActiveItem] = useState("/");
  const [useCards, setUseCards] = useState(false);
  const animationContainer = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const handler = (e) => setUseCards(e.detail.useCards);
    window.addEventListener('toggleViewMode', handler);
    return () => window.removeEventListener('toggleViewMode', handler);
  }, []);

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
    if (pathname.startsWith("/Projects") || pathname.startsWith("/Blocks")) {
      setActiveItem("/Projects");
    } else if (pathname.startsWith("/Blog") || pathname.startsWith("/Blogs")) {
      setActiveItem("/Blog");
    } else {
      setActiveItem(pathname);
    }
  }, [pathname]);

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
        md:px-10 md:py-4
        xl:px-16
      "
    >
      <div
        className="
          max-w-[1100px] mx-auto w-full flex justify-between items-center gap-4
          text-[var(--color-text-primary)]
          max-[1100px]:flex-col max-[1100px]:items-end max-[1100px]:gap-2 max-[1100px]:w-fit
        "
      >
        {/* Name */}
        <div className="flex items-center list-none">
          <div>
            <li
              className="relative list-none h-[2.8rem] leading-[2.1rem] pl-0"
              onClick={() => setActiveItem("/")}
            >
              <div>
                <Link
                  href="/"
                  onClick={() => setActiveItem("/")}
                  className={`
                    ${activeItem === "/" ? "text-[2rem] text-[var(--color-text-primary)] font-black" : "text-[1.6rem] text-inherit font-normal"}
                  `}
                >
                  Anthony Balsamo
                </Link>
              </div>
              <div
                className="h-2 bg-[var(--color-border-default)] absolute rounded-full transition-all duration-500"
                style={{ width: activeItem === "/" ? "100%" : "0%" }}
              />
            </li>
          </div>
        </div>

        {/* Links */}
        <ul
          className="
            flex items-center list-none flex-1 justify-end gap-8
            max-[1100px]:justify-end max-[1100px]:flex-none max-[1100px]:gap-4
          "
        >
          {useCards && (
            <li className="relative list-none h-[2.8rem] leading-[2.1rem]">
              <div>
                <Link
                  href="/Projects"
                  onClick={() => setActiveItem("/Projects")}
                  className={`
                    ${activeItem === "/Projects" ? "text-[2rem] text-[var(--color-text-primary)] font-black" : "text-[1.6rem] text-inherit font-normal"}
                  `}
                >
                  Projects
                </Link>
              </div>
              <div
                className="h-2 bg-[var(--color-border-default)] absolute rounded-full transition-all duration-500"
                style={{ width: activeItem === "/Projects" ? "80%" : "0%" }}
              />
            </li>
          )}

          <li className="relative list-none h-[2.8rem] leading-[2.1rem] flex items-center">
            <div>
              <a
                href="/Anthony Balsamo Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-[1.6rem] text-inherit font-normal"
              >
                Resume
              </a>
            </div>
          </li>

          <li className="flex items-center list-none">
            <div>
              <div
                className="anime-contain"
                ref={animationContainer}
                onClick={startAnimation}
                style={{
                  width: 30,
                  height: 30,
                  cursor: "pointer",
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

export default NavHeader;
