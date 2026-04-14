import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex justify-center items-center w-full pointer-events-auto mt-auto pt-16">
      <div
        className="flex justify-center items-center px-8 py-4 w-auto font-bold rounded-t-xl bg-[var(--color-bg-surface)] text-[var(--color-text-link)] hover:underline"
      >
        <p>
          <span>
            <a
              href="https://github.com/antonionii/antbalsamo"
              target="_blank"
              rel="noopener noreferrer"
            >
              &lt;source code here&gt;
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
