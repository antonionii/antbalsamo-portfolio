"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { motion } from "framer-motion";
import lottie from "lottie-web"; // Regular import
import { slidedownAnim, slideleftAnim, textFade } from "../styles/animation";
import { changeColor } from "./theme/changeColor";
const Nav = ({ colorSchemeType, setColorSchemeType }) => {
  const pathname = usePathname(); // Get current pathname
  const [direction, setDirection] = useState(1);
  const [isLight, setIsLight] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const animationContainer = useRef(null);
  const animRef = useRef(null); // Use a ref to hold the animation instance

  // Memoize the startAnimation function
  const startAnimation = useCallback(
    (event) => {
      if (event) {
        event.stopPropagation(); // Stop propagation
      }
      if (!animRef.current) {
        return;
      }
      animRef.current.setDirection(direction);
      animRef.current.play();

      // Change speed and color scheme based on direction
      if (direction === -1) {
        animRef.current.setSpeed(2);
        changeColor("light");
        setColorSchemeType("light");
        setIsLight(true);
      } else {
        animRef.current.setSpeed(1);
        changeColor("dark");
        setColorSchemeType("dark");
        setIsLight(false);
      }

      setDirection(direction * -1); // Toggle direction
    },
    [direction, setColorSchemeType]
  );

  // Handle color scheme changes
  useEffect(() => {
    setIsLight(colorSchemeType === "light");
    const newDirection = colorSchemeType === "light" ? 1 : -1;
    if (newDirection !== direction) {
      setDirection(newDirection);
      startAnimation(); // Use memoized startAnimation
    }
  }, [colorSchemeType, direction, startAnimation]);

  // Update activeItem based on pathname
  useEffect(() => {
    if (pathname.startsWith("/Projects") || pathname.startsWith("/Blocks")) {
      setActiveItem("/Projects");
    } else if (pathname.startsWith("/Blog") || pathname.startsWith("/Blogs")) {
      setActiveItem("/Blog");
    } else {
      setActiveItem(pathname);
    }
  }, [pathname]);

  // Load and initialize the lottie animation on the client side
  useEffect(() => {
    if (!animRef.current && typeof window !== "undefined") {
      animRef.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "https://assets1.lottiefiles.com/packages/lf20_ebutdyzo.json",
      });
    }

    // Cleanup function to destroy the animation when the component unmounts
    return () => {
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, []);

  return (
    <div className="nav-container">
      <StyledNav id="nav" isLight={isLight}>
        <NavInner>
        <motion.div
          transition-delay="0s"
          initial="hidden"
          animate="show"
          variants={textFade}
        >
          <NavItem
            style={{ paddingLeft: "0" }}
            isActive={activeItem === "/"}
            onClick={() => setActiveItem("/")}
          >
            <motion.div initial="hidden" animate="show" variants={slidedownAnim()}>
              <Link href="/" onClick={() => setActiveItem("/")}>
                Anthony Balsamo
              </Link>
            </motion.div>
            <Line
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: activeItem === "/" ? "100%" : "0%",
              }}
            />
          </NavItem>
        </motion.div>

        <ul>
          <NavItem isActive={activeItem === "/Projects"}>
            <motion.div
              initial="hidden"
              animate="show"
              variants={slidedownAnim(0.1)}
            >
              <Link href="/Projects" onClick={() => setActiveItem("/Projects")}>
                Projects
              </Link>
            </motion.div>

            <Line
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: activeItem === "/Projects" ? "80%" : "0%",
              }}
            />
          </NavItem>

          {/* <NavItem isActive={activeItem === "/Blog"}>
            <motion.div
              initial="hidden"
              animate="show"
              variants={slidedownAnim(0.2)}
            >
              <Link href="/Blog" onClick={() => setActiveItem("/Blog")}>
                Blog
              </Link>
            </motion.div>

            <Line
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: activeItem === "/Blog" ? "65%" : "0%",
              }}
            />
          </NavItem> */}

          <NavItem>
  <motion.div
    initial="hidden"
    animate="show"
    variants={slidedownAnim(0.3)}
  >
    <a
      href="/Anthony Balsamo Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      Resume
    </a>
  </motion.div>
  {/* No underline Line for external link, but you can add if you want */}
</NavItem>

          <li style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
            <motion.div
              initial="hidden"
              animate="show"
              variants={slideleftAnim(0.4)}
            >
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
            </motion.div>
          </li>
        </ul>
        </NavInner>
        <NavLine />
      </StyledNav>
    </div>
  );
};


const StyledNav = styled(motion.div)`
  .nav-container & {

  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 10rem 0 10rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 15;
  background: var(--color-Background-Base);
  pointer-events: none;
  h1 {
    pointer-events: auto;
  }
  ul {
    display: flex;
    flex: 1;
    align-items: center;
    list-style: none;
    pointer-events: auto;
  }
  @media (max-width: 667px) {
    flex-direction: column;
    padding: 2rem 1rem 0rem 1rem;
    background: var(--color-Background-Base);
    ul {
      padding: 1rem;
      width: 100%;
      gap: 5%;
      margin: auto;
      justify-content: center;
      align-items: center;
      li {
        padding: 0;
      }
    }
  }
}
`;

const NavInner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  color: var(--color-Foreground-Text-Base);
  display: flex;
  justify-content: space-between;
  align-items: center;
   @media (max-width: 1100px) {
    flex-direction: column;
    background: var(--color-Background-Base);
    ul {
      padding: 1rem;
      width: 100%;
      gap: 5%;
      margin: auto;
      justify-content: center;
      align-items: center;
      li {
        padding: 0;
      }
    }
  }
`;

const NavItem = styled.li`
  position: relative;
  list-style: none;
  height: 2.8rem;
  line-height: 2.1rem;
  a {
    font-size: ${(props) =>
    props.noResize ? "1.6rem" : props.isActive ? "2rem" : "1.6rem"};
    color: ${(props) => (props.isActive ? "var(--color-Foreground-Text-Base)" : "inherit")};
    font-weight: ${(props) => (props.isActive ? "900" : "regular")};
  }
`;

const Line = styled(motion.div)`
  height: 0.5rem;
  background: var(--color-Foreground-Border-Default);
  width: 0%;
  position: absolute;
  border-radius: 6rem;
`;

const NavLine = styled(motion.div)`
  height: 4px;
  background: #ff0000;
  width: 100%;
  position: absolute;
  top: -10%;
  bottom: 0%;
  left: 0%;
  &:after {
    height: 4px;
    background: #ffff00;
    width: 100%;
    position: absolute;
    top: 100%;
    bottom: 0%;
    left: 0%;
  }
  @media (max-width: 1300px) {
    left: 0%;
  }
`;

export default Nav;
