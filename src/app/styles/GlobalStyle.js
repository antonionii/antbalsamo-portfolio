import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  --color-neutral-black: #3E3E3E;
  --color-neutral-white: #FFFFFF;
  --color-red-100: #FFF5F3;
  --color-red-500: #B93715;
  --color-green-100: #F3FFF4;
  --color-green-500: #5DAE64;
  --color-blue-100: #F3F9FF;
  --color-blue-500: #1979B9;
}
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
}

html{
  overflow-x: clip;
}
body {
    background: var(--color-Background-Base);
    font-family: "Noto Sans", sans-serif;
    font-weight: 900;
    overflow-x: clip;
    color: var(--color-Foreground-Text-Base);
    margin: 0;
    padding: 0;
    width: 100%;

  font-optical-sizing: auto;
  font-style: normal;
}

img {
  width: 100%;
  height:auto;
}

/* ripple stuff */
.ripple {
  width: 10px;
  height: 10px;
  background-color: transparent;
  position: fixed;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0)
}

@keyframes ripple-effect {
  to {
    width: 50px;
    height: 50px;
    opacity: 0.01
  }
}

button{
    font-weight: bold;
    color: var(--color-Foreground-Text-Default);
    cursor: pointer;
    font-size: 2rem;
    padding: 1rem 2rem;
    transition: all 0.5s ease;
    font-family: "Noto Sans", sans-serif;
    &:hover{
  
    }

}

    h4{
        font-weight: bold;
        
        font-size: 2rem;
    }
    span{
        
            
    }
    p{
    font-family: "Noto Sans", sans-serif;
        font-weight: thin;

        padding: 3rem 0rem;
        line-height: 150%;
    }

    #wave{
        stroke: "120000";
    }
    li {
    font-family: "Noto Sans", sans-serif;
    padding-left: 3rem;
    position: relative;
    font-family: "Noto Sans", sans-serif;
    font-weight: regular;
  }
  a {
    font-family: "Noto Sans", sans-serif;
    font-size: 1rem;


    text-decoration: none;
    font-weight:regular;
    color: inherit;
    pointer-events:auto;

  }


.introText {
  margin: auto; /* Reduce top margin */
}

@media (min-width: 780px) {
  .introText {
    margin: auto; /* Reduce margin for medium screens */
  }
}

@media (min-width: 1300px) {
  .introText {
    margin: auto; /* Reduce margin for large screens */
  }
}

}


.aboutContainer{
  margin: 8rem 0rem 0rem 0rem; /* Reduce top margin */
  display:flex;
  @media (min-width: 780px) {
}


@media (mid-width: 1300px){
display: flex;
}
}


.link-container {
  max-width: 600px;
  margin: 1rem auto 0rem auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
    margin: 1rem auto 0rem auto;
  @media (min-width: 780px) {
    margin: 1rem 0rem -1rem 0rem;

}


@media (mid-width: 1300px){
display: flex;
}
}

.link {
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem; /* Equivalent to rounded in Tailwind */
  text-decoration: none;
  color: #1a202c; /* Default text color */
  display: inline-block;
  transition: background-color 0.3s ease;
}

.twitter {
  background-color: #cfe8ff; /* bg-blue-200 */
}

.twitter:hover {
  background-color: #9bd0ff; /* hover:bg-blue-300 */
  color: #1a202c; /* text-blue-800 */
}

.github {
  background-color: #e2e8f0; /* bg-gray-300 */
}

.github:hover {
  background-color: #cbd5e0; /* hover:bg-gray-400 */
  color: #1a202c; /* text-gray-800 */
}

.dribbble {
  background-color: #fed7e2; /* bg-pink-200 */
}

.dribbble:hover {
  background-color: #fbb6ce; /* hover:bg-pink-300 */
  color: #702459; /* text-pink-800 */
}

.bg-section {

    background-color: var(--color-Background-Default); /* Equivalent to bg-gray-100 */
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
    margin-bottom:auto;

}

.heading {
  font-size: 2.5rem; /* Equivalent to text-4xl */
  font-weight: bold;
  margin-top: 0.5rem; /* Equivalent to mt-2 */
    margin-bottom:auto;
        color: var(--accentText-color);


}

.subheading {
  font-size: 1.5rem; /* Equivalent to text-2xl */
    color: var(--accentText-color);
  text-align: center;
  margin-bottom:auto;
}
`;
export default GlobalStyle;
