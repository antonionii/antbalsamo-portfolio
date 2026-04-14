import styled from "styled-components";
import {motion} from "framer-motion";

export const AboutLayout = styled(motion.div)`
  min-height: 50vh;
  align-items: left;
  justify-content: center;
  color: white;
  width: 100%;
  height: fit;
  padding: 0rem 0rem;

    img {
    margin: 4rem 0rem;
    width: 90%;
    height: auto;
    object-fit: cover;
  }

  @media (max-width: 750px) {
    h2 {
      font-size: 5rem;
      padding: 0rem 0rem;
    }
  }
  @media (min-width: 780px) {
    text-align: left;
    padding: 0rem 0rem;

    img {
      width: 70%;
      height: auto;
    }
  }
  @media (min-width: 1300px) {
    text-align: left;
    padding: 0rem 0rem;

    img {
      width: 50%;
      height: auto;
    }
  }
`;

export const StyledDescription = styled(motion.div)`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: left;
  z-index: 2;
  pointer-events: none;
  width: 100%;
  height: auto;
  margin-bottom: 0;  // Remove bottom margin
  padding-bottom: 0; // Remove bottom padding

  h1 {
      font-weight: bolder;
      color: var(--color-Foreground-Text-Default);
      width: "100%";
      height: "auto";
      font-size: 1.6rem;
        font-family: "Inter", system-ui;
        

  }

  @media (max-width: 1300px) {
    padding: 0;
  margin: 0 auto;
  
  }

  show: {
    transition: {
      staggerchildren: 2;
    }
  }
`;


export const StyledImage = styled(motion.div)`
  overflow: hidden;
  z-index: 2;
  padding: 0rem 0rem 0rem 50rem;

  img {
    width: 50%;
    height: auto;
    object-fit: cover;
  }
`;

export const StyledHide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
