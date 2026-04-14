import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        mx-auto flex items-center justify-center
        rounded-full p-4 text-base
        cursor-pointer overflow-hidden
        text-center break-words
        transition-shadow duration-100 ease-in-out
        bg-[var(--color-intent-positive)]
        text-[var(--color-text-inverse)]
        shadow-[0_0_0_0px_var(--color-text-inverse)]
        hover:shadow-[0_0_0_4px_var(--color-text-inverse)]
      "
    >
      {children}
    </button>
  );
};

export default Button;