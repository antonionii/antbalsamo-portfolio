"use client";

import React, { useState } from "react";
import StyledSnackbar from "./StyledSnackbar";

interface TagsProps {
  animated?: boolean;
}

const Tags: React.FC<TagsProps> = ({ animated = true }) => {
  const [emailText, setEmailText] = useState("antbalsamo@gmail.com");
  const [isCopied, setIsCopied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText("antbalsamo@gmail.com");
    setIsCopied(true);
    setEmailText("Copied!");
    setOpenSnackbar(true);

    setTimeout(() => {
      setEmailText("antbalsamo@gmail.com");
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="link-container">
      <a className="link github" href="https://github.com/antonionii/">
        GitHub
      </a>
      <a className="link linkedin" href="https://www.linkedin.com/in/antbalsamo/">
        LinkedIn
      </a>
      <div
        onClick={handleEmailClick}
        className="link email"
        style={{
          cursor: "pointer",
          display: "inline-block",
          minWidth: "200px",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <a style={{ display: "block", whiteSpace: "nowrap", opacity: isCopied ? 0.8 : 1, fontFamily: "'Roboto Slab', serif" }}>
          {emailText}
        </a>
      </div>
      <StyledSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Copied link: Tony's Email"
      />
    </div>
  );
};

export default Tags;