import React from "react";

export const PageContainer = ({ children, className = "" }) => (
  <div
    className={`
      flex flex-col flex-1 gap-8 mx-auto w-full
      px-4 py-8
      md:px-10
      xl:max-w-[1200px] xl:px-0
      ${className}
    `}
  >
    {children}
  </div>
);