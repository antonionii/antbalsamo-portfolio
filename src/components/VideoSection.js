import React, { useState } from "react";
//Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import { thumbnailAnim } from "../animation";
// import { uuid } from "uuidv4";
import { BasicLayout } from "../styles";
import VideoPlayer from "./VideoPlayer";
import styled from "styled-components";
import lottie from "lottie-web";

const DemoContainer = styled(motion.div)`
  position: relative;
  padding: 0rem 0rem 0rem 3rem;
  justify-content: center;
  width: 100%;
  height: auto;
  @media (min-width: 780px) {
    left: 0px;
    bottom: 0px;
    top: 30px;
    padding: 0rem 0rem 0rem 1rem;
  }
  @media (min-width: 1300px) {
  }
`;

const VideoSection = () => {
  const [direction, setDirection] = useState(1);

  let reelStyleContainer = React.createRef();

  const [anim, setAnim] = useState(null);

  React.useEffect(() => {
    let newDirection = 1;

    if (newDirection !== direction) {
      setDirection(newDirection);
      startAnimation();
    }
  }, []);
  React.useEffect(() => {
    if (anim) {
      return;
    }

    let tempAnim = lottie.loadAnimation({
      container: reelStyleContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://assets10.lottiefiles.com/packages/lf20_tvlmtbna.json",
    });

    setAnim(tempAnim);
    console.log("anim is set");
  }, []);

  function startAnimation() {
    if (!anim) {
      return;
    }
    anim.setDirection(direction);
    anim.play();
    if (direction === -1) {
      // from dark to light
      anim.setSpeed(2);
    } else {
      // from light to dark
      anim.setSpeed(1);
    }
    // change direction
    setDirection(direction * -1);
  }

  //Ref for our element
  const [isFullScreenVideoShown, setIsFullScreenVideoShown] = useState(false);

  return (
    <BasicLayout>
      <DemoContainer style={{ pointerEvents: "none", zIndex: 10 }}>
        <motion.div
          id="reelStyleContainer"
          ref={reelStyleContainer}
          onMouseOver={startAnimation}
          onMouseOut={startAnimation}
          onClick={() => setIsFullScreenVideoShown(true)}
          className="cls-3"
          variants={thumbnailAnim(2)}
        ></motion.div>
        <motion.img
          src="https://image.mux.com/00c01ueogq01fHfB9E9GIkMvOShYvaSG600N6mY9a02ztgJM/animated.gif?start=10&end=14"
          variants={thumbnailAnim(2)}
          alt="gif of video"
          onClick={() => setIsFullScreenVideoShown(true)}
          style={{
            maxWidth: "600px",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
        />
      </DemoContainer>

      <AnimatePresence>
        {isFullScreenVideoShown && (
          <motion.div
            // variants={demoAnim}
            initial={{
              // opacity: 0.2,
              padding: "0 40px",
              transform: "perspective(42rem) rotateX(-90deg) scale3d(1,1,1)",
              transformOrigin: "top center",
            }}
            animate={{
              // opacity: 1,
              transform: "perspective(42rem) rotateX(0deg) scale3d(1,1,1)",
              transition: { duration: 1, ease: "easeOut" },
            }}
            exit={{
              // opacity: 0.2,
              padding: "0 40px",
              transform: "perspective(42rem) rotateX(-90deg) scale3d(1,1,1)",
              transformOrigin: "top center",
            }}
            key="987654321"
            style={{
              position: "fixed",
              display: "flex",
              background: "rgba(0,0,0,0.9)",
              inset: 0,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <button
              // key={uuid()}
              style={{
                position: "absolute",
                top: 40,
                right: 40,
                borderRadius: "20%",
              }}
              onClick={() => setIsFullScreenVideoShown(false)}
            >
              X
            </button>
            <motion.div
              style={{
                display: "flex",
                maxWidth: 1600,
              }}
            >
              <VideoPlayer playbackUrl="https://stream.mux.com/00c01ueogq01fHfB9E9GIkMvOShYvaSG600N6mY9a02ztgJM.m3u8" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BasicLayout>
  );
};

//Styled Components were here before

export default VideoSection;
