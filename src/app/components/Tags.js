import React, { useState } from "react";
import StyledSnackbar from "./StyledSnackbar";

const Tags = ({ animated = true }) => {
  const [emailText, setEmailText] = useState("antbalsamo@gmail.com");
  const [isCopied, setIsCopied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for controlling Snackbar visibility

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleEmailClick = () => {
    navigator.clipboard.writeText("antbalsamo@gmail.com");
    setIsCopied(true);
    setEmailText("Copied!");

    // Show the Snackbar when email is clicked
    setOpenSnackbar(true);

    setTimeout(() => {
      setEmailText("antbalsamo@gmail.com");
      setIsCopied(false);
    }, 2000); // Change back after 2 seconds
  };

  if (!animated) {
    return (
      <div className="link-container">
        <a className="link github" href="https://github.com/antonionii/">
          GitHub
        </a>
        <a className="link twitter" href="https://www.linkedin.com/in/antbalsamo/">
          LinkedIn
        </a>
        <div
          onClick={handleEmailClick}
          className="link dribbble"
          style={{
            cursor: "pointer",
            display: "inline-block",
            minWidth: "200px",
            textAlign: "center",
            borderRadius: "8px",
          }}
        >
          <a style={{ display: "block", whiteSpace: "nowrap", opacity: isCopied ? 0.8 : 1 }}>
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
  }

  return (
    <div className="link-container">
      <a className="link github" href="https://github.com/antonionii/">
        GitHub
      </a>
      <a className="link twitter" href="https://www.linkedin.com/in/antbalsamo/">
        LinkedIn
      </a>
      <div
        onClick={handleEmailClick}
        className="link dribbble"
        style={{
          cursor: "pointer",
          display: "inline-block",
          minWidth: "200px",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <a style={{ display: "block", whiteSpace: "nowrap", opacity: isCopied ? 0.8 : 1 }}>
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
