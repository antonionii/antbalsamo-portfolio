import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * Custom toast notification component.
 *
 * Uses React's createPortal to render directly into document.body,
 * bypassing any parent stacking contexts (like the sticky header).
 * Uses inline styles to avoid CSS-in-JS specificity conflicts
 * between styled-components and Emotion/MUI.
 */
const StyledSnackbar = ({ open, onClose, message, autoHideDuration = 3200 }) => {
  const [displayedSnackbars, setDisplayedSnackbars] = useState([]);

  // When open becomes true with a message, add a new toast to the queue
  useEffect(() => {
    if (open && message) {
      setDisplayedSnackbars((prev) => {
        const newQueue = [...prev, { message, key: Date.now() }];
        // Cap at 5 visible toasts
        if (newQueue.length > 5) newQueue.shift();
        return newQueue;
      });
    }
  }, [open, message]);

  // Auto-dismiss each toast after autoHideDuration
  const handleClose = useCallback(
    (key) => {
      setDisplayedSnackbars((prev) => prev.filter((s) => s.key !== key));
      onClose();
    },
    [onClose]
  );

  // Don't render anything if there are no toasts and nothing is open
  if (displayedSnackbars.length === 0) return null;

  // Read theme colors at render time so they stay in sync with theme changes
  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-text-secondary")
    .trim();
  const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-bg-surface")
    .trim();

  // createPortal renders this JSX as a direct child of document.body,
  // completely outside the React component tree's DOM nesting.
  // This means it escapes the MainContent (z-index: 1) and any
  // Framer Motion transform-based stacking contexts.
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: "0.75rem",
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    >
      {displayedSnackbars.map((snackbar) => (
        <Toast
          key={snackbar.key}
          message={snackbar.message}
          textColor={textColor}
          bgColor={bgColor}
          autoHideDuration={autoHideDuration}
          onClose={() => handleClose(snackbar.key)}
        />
      ))}
    </div>,
    document.body
  );
};

/**
 * Individual toast item with its own auto-dismiss timer.
 * Separated into its own component so each toast manages
 * its own lifecycle independently.
 */
const Toast = ({ message, textColor, bgColor, autoHideDuration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, autoHideDuration);
    return () => clearTimeout(timer);
  }, [autoHideDuration, onClose]);

  // Using window.innerWidth check for responsive styling
  // since we can't use media queries in inline styles
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 780;

  return (
    <div
      role="alert"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize: isMobile ? "1rem" : "1.4rem",
        fontWeight: 500,
        fontFamily: "Inter, sans-serif",
        boxShadow: `.6rem 0.6rem 0rem 0rem ${getComputedStyle(document.documentElement).getPropertyValue("--color-shadow").trim() || "#3E3E3E"}`,
        padding: isMobile ? "8px 16px" : "6px 16px",
        maxWidth: isMobile ? "70%" : "600px",
        width: "auto",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        boxSizing: "border-box",
        borderRadius: "4px",
        pointerEvents: "auto",
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
};

export default StyledSnackbar;
