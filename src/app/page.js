"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageHeaderText from "./components/PageHeaderText";
import ProfileCard from "./components/ProfileCard";
import CardComponent from "./components/CardComponent";
import ProjectLinksComponent from "./components/ProjectLinksComponent";
import Button from "./components/ButtonComponent";
import Tags from "./components/Tags";
import StyledSnackbar from "./components/StyledSnackbar";
import projectCardData from "./data/projectCardData";
import { useRouter } from "next/navigation";
import PasswordModal from "./components/PasswordModal";
import { PageContainer } from "./styles/PageContainer";

const Home = () => {
  const [colorForegroundTextDefault, setcolorForegroundTextDefault] = useState("");
  const [colorBackgroundDefault, setcolorBackgroundDefault] = useState("");
  const [isClient, setIsClient] = useState(false);

  const [pendingCard, setPendingCard] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [useCards, setUseCards] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      window.dispatchEvent(new CustomEvent('toggleViewMode', { detail: { useCards: false } }));
      const colorForegroundTextDefault = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim();
      const colorBackgroundDefault = getComputedStyle(document.documentElement).getPropertyValue('--color-bg-surface').trim();
      setcolorForegroundTextDefault(colorForegroundTextDefault);
      setcolorBackgroundDefault(colorBackgroundDefault);
    }
  }, []);

  const [icon, setIcon] = useState("link");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const getTheme = () => {
      const themeId = getComputedStyle(document.documentElement)
        .getPropertyValue('--theme-id')
        .trim();
      return themeId === "b1" ? "dark" : "light";
    };
    setTheme(getTheme());
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  const handleIconClick = () => {
    setIsWiggling(true);
    setIcon("sentiment_satisfied");
    navigator.clipboard.writeText(window.location.href);
    setOpenSnackbar(true);
    setTimeout(() => setIcon("link"), 1500);
    setTimeout(() => setIsWiggling(false), 2000);
  };

  const router = useRouter();

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    if (pendingCard) {
      router.push(pendingCard.linkTo);
      setPendingCard(null);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.isPasswordModalOpen = showPasswordModal;
    }
  }, [showPasswordModal]);

  if (!isClient) return null;

  return (
    <>
      {useCards ? (
        <PageContainer>
          <div className="flex flex-col gap-24">
            {/* Hero Card */}
            <div
              className="
                flex flex-col gap-3
                w-full p-4 rounded-2xl overflow-hidden
                bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]
                md:w-[55%] md:mx-auto md:px-8 md:pb-8 md:pt-0
                xl:w-[35%]
              "
            >
              <div className="flex justify-between items-center">
                <ProfileCard
                  numOfItems={6}
                  itemsText={["Product Designer"]}
                  className="flex flex-wrap items-center text-[var(--color-text-secondary)] [&_h1]:leading-[1.3] [&_h1]:text-base md:[&_h1]:text-[2rem] xl:[&_h1]:text-[2.8rem]"
                  />
                  <span
                  className={`
                  material-symbols-outlined text-[2rem] inline-block align-middle
                  text-[var(--color-text-secondary)] cursor-pointer p-2 rounded-[10%]
                  transition-colors duration-300
                  hover:bg-black/10
                  max-[780px]:hover:bg-transparent
                  ${isWiggling ? "animate-wiggle" : ""}
                  `}
                  data-icon="true"
                  onClick={handleIconClick}
                >
                  {icon}
                </span>
              </div>
              <img
                src={theme === "dark" ? "https://i.imgur.com/71KHhPR.png" : "https://i.imgur.com/ItIuUEc.png"}
                alt="picture of me"
                className="block mx-auto w-[40vw] max-w-[240px] object-center xl:w-[60%] xl:pr-8"
              />
              <p className="text-[1.2rem] text-[var(--color-text-secondary)] font-medium">
                Designing creative and delightful experiences into scalable products.
              </p>
              <p className="text-[1.2rem] text-[var(--color-text-secondary)] font-medium">
                If you&apos;d like to work together, drop me a message at my email below.
              </p>
              <Tags />
            </div>

            <StyledSnackbar
              open={openSnackbar}
              onClose={handleCloseSnackbar}
              message="Copied link: Tony's Website"
            />

            <div className="text-center">
              <PageHeaderText
                numOfItems={7}
                itemsText={["✨", "Design", "Highlights ", "✨"]}
                fontSize="1.4rem"
                fontColor={colorForegroundTextDefault}
              />
            </div>

            <CardComponent
              cards={projectCardData.slice(0, 4)}
              onCardClick={card => {}}
              onProtectedCardClick={card => {
                setPendingCard(card);
                setShowPasswordModal(true);
              }}
            />

            <Button onClick={() => router.push("/Projects")}>
              See All Projects
            </Button>
          </div>
        </PageContainer>
      ) : (
        /* Links Layout */
        <div
          className="
            flex flex-col flex-1 min-h-[calc(100vh-6rem)] justify-center
            px-4 py-8
            md:px-10
            xl:max-w-[1200px] xl:mx-auto xl:w-full xl:px-0
          "
        >
          <div
            className="
              flex flex-col items-center gap-12
              min-[1000px]:flex-row min-[1000px]:items-center min-[1000px]:justify-center min-[1000px]:gap-16
            "
          >
            {/* Hero Card Container */}
            <div className="flex justify-center items-center shrink-0 w-full min-[1000px]:w-1/2">
              <div
                className="
                  flex flex-col gap-3
                  w-full p-4 rounded-2xl overflow-hidden
                  bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]
                  md:w-[55%] md:mx-auto md:px-8 md:pb-8 md:pt-4
                  min-[1000px]:w-full min-[1000px]:max-w-[35rem] min-[1000px]:mx-auto
                  xl:px-8 xl:pb-8 xl:pt-4
                "
              >
                <div className="flex justify-between items-center">
                  <ProfileCard
                    numOfItems={6}
                    itemsText={["Product Designer"]}
                    className="flex flex-wrap items-center text-[var(--color-text-secondary)] [&_h1]:leading-[1.3] [&_h1]:text-base md:[&_h1]:text-[2rem] xl:[&_h1]:text-[2.8rem]"
                  />
                  <span
                    className={`
                      material-symbols-outlined text-[2rem] inline-block align-middle
                      text-[var(--color-text-secondary)] cursor-pointer p-2 rounded-[10%]
                      transition-colors duration-300
                      hover:bg-black/10
                      max-[780px]:hover:bg-transparent
                      ${isWiggling ? "animate-wiggle" : ""}
                    `}
                    data-icon="true"
                    onClick={handleIconClick}
                  >
                    {icon}
                  </span>
                </div>
                <img
                  src={theme === "dark" ? "https://i.imgur.com/71KHhPR.png" : "https://i.imgur.com/ItIuUEc.png"}
                  alt="picture of me"
                  className="block mx-auto w-[40vw] max-w-[240px] object-center xl:w-[60%] xl:pr-8"
                />
                <p className="text-[1.2rem] text-[var(--color-text-secondary)] font-medium">
                  Designing creative and delightful experiences into scalable products.
                </p>
                <p className="text-[1.2rem] text-[var(--color-text-secondary)] font-medium">
                  If you&apos;d like to work together, drop me a message at my email below.
                </p>
                <Tags animated={false} />
              </div>
            </div>

            {/* Links Column */}
            <div className="flex flex-col gap-1 flex-1 max-w-[32rem] w-full">
              <ProjectLinksComponent
                cards={projectCardData}
                onCardClick={card => {}}
                onProtectedCardClick={card => {
                  setPendingCard(card);
                  setShowPasswordModal(true);
                }}
              />
            </div>
          </div>

          <StyledSnackbar
            open={openSnackbar}
            onClose={handleCloseSnackbar}
            message="Copied link: Tony's Website"
          />
        </div>
      )}

      {showPasswordModal && (
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}
    </>
  );
};

export default Home;
