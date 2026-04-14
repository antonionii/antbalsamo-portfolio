"use client";

import React, { useEffect, useState, createContext } from "react";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";
import "./globals.css";
import Footer from "./components/Footer";
import { applyTheme } from "./components/theme/tokens";
import Script from "next/script";

const NavHeader = dynamic(() => import('./components/NavHeader'), { ssr: false });
const ProjectHeader = dynamic(() => import('./components/ProjectHeader'), { ssr: false });

export const ModalContext = createContext();

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/Blocks");
  const [colorSchemeType, setColorSchemeType] = useState("light");
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [modalImage, setModalImage] = useState(null); // Track modal image
  const [zoomLevel, setZoomLevel] = useState(1); // For zooming
  const [isZoomed, setIsZoomed] = useState(false); // Track zoom status
  const [zoomPosition, setZoomPosition] = useState({ x: 0.5, y: 0.5 }); // Track zoom center position
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 }); // Dragging state
  const [isDragging, setIsDragging] = useState(false); // Track dragging state

  // Scroll to top when mounted
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      const timeout = setTimeout(() => {
        scrollToTop();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Background click handler
  // const handleBgClick = (evt) => {
  //   const isNavLink = evt.target.closest("a");
  //   const isButton = evt.target.closest("button");
  //   const isIcon = evt.target.closest('[data-icon="true"]');
  //   const isImage = evt.target.tagName === "IMG"; // Check if click is on an image

  //   // Only change background color if the modal is not open and if it's not a nav, button, icon, or image
  //   if (!isNavLink && !isButton && !isIcon && !isImage && !isModalOpen) {
  //     setColorSchemeType("light");
  //     changeColor("light");
  //   }
  // };

  // Open modal with image
  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsZoomed(false); // Reset zoom
    setZoomLevel(1); // Reset zoom level
    setZoomPosition({ x: 0.5, y: 0.5 }); // Center zoom
    setDragPosition({ x: 0, y: 0 }); // Reset drag position
    setIsModalOpen(true); // Open the modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalImage(null); // Clear the modal image
    setIsDragging(false); // Reset dragging
  };

  // Zoom handling
  const handleZoomClick = (e) => {
    if (!isZoomed) {
      const rect = e.target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setZoomPosition({ x, y });
      setZoomLevel(2.4); // Zoom to 150%
      setIsZoomed(true);
    } else {
      setZoomLevel(1); // Zoom out
      setIsZoomed(false);
    }
  };

  const handleDragStart = (e) => {
    if (isZoomed) {
      setIsDragging(true);
    }
  };

  const handleDragMove = (e) => {
    if (isDragging && isZoomed) {
      const dragX = dragPosition.x + e.movementX;
      const dragY = dragPosition.y + e.movementY;
      setDragPosition({ x: dragX, y: dragY });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Apply color scheme on change
  useEffect(() => {
    if (colorSchemeType === "light") {
      applyTheme("light");
    } else {
      applyTheme("dark");
    }
  }, [colorSchemeType]);

  return (
    <ModalContext.Provider value={{ openImageModal, closeModal }}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />

          {/* Preconnect for fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          
          {/* Google Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" rel="stylesheet" />
          
          <style jsx global>{`
            .material-symbols-outlined {
              font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
            }
          `}</style>

          {/* Favicon and icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

          {/* SEO Meta Tags */}
=          <meta name="description" content="Portfolio showcasing senior product design expertise. Specializing in UX/UI design and interactive experiences." />
          <meta name="keywords" content="senior product design, UX design, UI design, creative design, art, product designer" />
          <meta name="author" content="Anthony Balsamo" />
          <meta property="og:title" content="Senior Product Designer | Anthony Balsamo" />
          <meta property="og:description" content="Portfolio showcasing senior product design expertise. Specializing in UX/UI design and interactive experiences." />
          <meta property="og:url" content="https://www.antbalsamo.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Senior Product Designer | Anthony Balsamo" />
          <meta name="twitter:description" content="Portfolio showcasing senior product design expertise. Specializing in UX/UI design and interactive experiences." />
=
          <Script src="/lottie-player.js" strategy="afterInteractive" />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-TYV9TCCG65"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TYV9TCCG65');
            `}
          </Script>
        </head>
        <body>
            <div className="flex flex-col min-h-screen">
            {isProjectPage ? (
              <ProjectHeader
                colorSchemeType={colorSchemeType}
                setColorSchemeType={setColorSchemeType}
              />
            ) : (
              <NavHeader
                colorSchemeType={colorSchemeType}
                setColorSchemeType={setColorSchemeType}
              />
            )}
            <main className="flex-1 flex flex-col relative">
              {children}
            </main>
            <Footer>
              <p>
                <span>
                  <a
                    href={"https://github.com/antonionii/antbalsamo"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &lt;source code here&gt;
                  </a>
                </span>
              </p>
            </Footer>
            </div>

            {/* Image zoom modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 w-screen h-screen bg-black/80 flex justify-center items-center z-[1000]"
                onClick={closeModal}
              >
                <div
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex justify-center items-center"
                  style={{
                    cursor: isZoomed ? "zoom-out" : "zoom-in",
                    transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                  }}
                >
                  <img
                    src={modalImage}
                    onClick={handleZoomClick}
                    className="max-w-[80vw] max-h-[80vh] object-contain transition-transform duration-300"
                    style={{
                      transform: `translate(${(0.5 - zoomPosition.x) * (zoomLevel - 1) * 100}%, ${(0.5 - zoomPosition.y) * (zoomLevel - 1) * 100}%) scale(${zoomLevel})`,
                    }}
                  />
                </div>
              </div>
            )}

            <Script src="/lottie-player.js" strategy="afterInteractive" />
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-TYV9TCCG65" strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TYV9TCCG65');
              `}
            </Script>
        </body>
      </html>
    </ModalContext.Provider>
  );
}

