import React from "react";

const PageHeaderText = ({ numOfItems, itemsText, variant, fontSize, fontColor, fontWeight }) => {
  const items = itemsText.slice(0, numOfItems);

  return (
    <section
      className="
        w-full py-2 rounded-2xl text-center
        bg-[var(--color-bg-surface)]
        text-[var(--color-text-primary)]
        md:inline-block md:w-auto md:px-2 md:max-w-[700px]
        xl:px-4 xl:max-w-none
      "
    >
      <div className="flex items-center z-[2] pointer-events-none w-full mx-auto">
        <div className="introText flex gap-[0.4rem]">
          {items.map((text, index) => (
            <h1
              key={index}
              style={{
                display: "inline-block",
                fontWeight: fontWeight || "600",
                fontSize: fontSize || "4rem",
                color: fontColor || "var(--color-text-secondary)",
              }}
            >
              {text}
            </h1>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageHeaderText;
