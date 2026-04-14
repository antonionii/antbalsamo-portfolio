import React from "react";

const ProfileCard = ({ numOfItems, itemsText, fontSize, fontColor, fontWeight, className = "" }) => {
  const items = itemsText.slice(0, numOfItems);

  return (
    <div
      className={`flex flex-col items-start z-[2] pointer-events-none w-full ${className}`}
    >
      <div className="flex flex-wrap justify-start w-full gap-2">
        {items.map((text, index) => (
          <h1
            key={index}
            className={`
              whitespace-normal leading-[1.3] break-words text-left
              shrink-0 flex max-w-full
              text-[var(--color-text-secondary)]
              ${text === "Designer:" ? "basis-full min-[500px]:basis-auto" : ""}
            `}
            style={{
              fontWeight: fontWeight || "700",
              fontSize: fontSize || "2rem",
            }}
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
