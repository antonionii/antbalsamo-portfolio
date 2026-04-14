import React, { useState, useEffect } from "react";
// Framer Motion
import { motion } from "framer-motion";
import { useWindowScroll, useMediaQuery } from "beautiful-react-hooks";
import { StyledDescription } from "../styles/styles";
import useDebounce from "../hooks/use-debounce";
import styled from "styled-components";

const HeroTText = ({ numOfItems, itemsText, variant, fontSize, fontColor, fontWeight }) => {
const [scrollY, setScrollY] = useState(0); 
const [screenHeight, setScreenHeight] = useState(null);
  const isMediumDisplay = useMediaQuery("(min-width: 780px)");
  const isLargeDisplay = useMediaQuery("(min-width: 1300px)");
useEffect(() => {
  if (typeof window !== "undefined") {
    setScrollY(window.scrollY);
  }
}, []);

useEffect(() => {
  if (typeof window !== "undefined") {
    setScreenHeight(window.screen.availHeight);
  }
}, []);

  const debouncedScrollY = useDebounce(scrollY, 300);

  // Ensure itemsText has enough text items for numOfItems
  const items = itemsText.slice(0, numOfItems);

  return (
    <StyledDescription
      style={{ display: "flex", alignItems: "left", marginBottom: 0 }}
    >
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap", // Enable wrapping only when necessary
          justifyContent: "flex-start", // Align text to the left
          width: "100%", // Make sure it spans the full width
          gap: "0.5rem", // Add consistent space between words
        }}
      >
        {items.map((text, index) => (
          <StyledMotionH1
            key={index}
            className={text === "Designer:" ? "break-after" : ""}
            style={{
              fontWeight: fontWeight || "700",
              fontSize: fontSize || "2rem",
            }}
            variants={
              typeof variant === "function"
                ? variant(0.1 * (index + 1))
                : variant
            }
          >
            {text}
          </StyledMotionH1>
        ))}
      </motion.div>
    </StyledDescription>
  );
};

const StyledMotionH1 = styled(motion.h1)`
  white-space: normal; // Ensure the text wraps when necessary
  line-height: 1.3;
  overflow-wrap: break-word; // Break long words if needed
  text-align: left; // Ensure text aligns left, but wraps if needed
  flex-shrink: 0; // Prevent the text from shrinking too much
  display: flex; // Keep the items inline but allow wrapping
  max-width: 100%; // Prevent it from overflowing beyond its container
  color: var(--color-Foreground-Text-Default);

  &.break-after {
    flex-basis: 100%; // Force it to take up the entire row on small screens

    @media (min-width: 500px) {
      flex-basis: auto; // Revert to normal behavior on larger screens
    }
  }


`;

export default HeroText;
