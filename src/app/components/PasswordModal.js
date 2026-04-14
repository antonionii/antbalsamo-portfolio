import React, { useState, useEffect } from "react";

export default function PasswordModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        onSuccess();
        onClose();
      } else {
        const data = await res.json();
        setError(data.message || "Incorrect password");
      }
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 w-screen min-h-screen bg-black/70 flex items-center justify-center z-[1000]">
      {/* Modal Box */}
      <div
        className="
          flex flex-col gap-2
          bg-[var(--color-bg-surface)] rounded-xl shadow-[0px_16px_48px_0px_rgba(0,0,0,0.175)]
          min-w-0 max-w-[85vw] w-[85vw] p-5 mx-auto
          min-[480px]:w-[340px] min-[480px]:max-w-[420px] min-[480px]:p-8
        "
      >
        {/* Icon */}
        <div className="flex justify-center items-center w-10 h-10 mx-auto text-[var(--color-text-secondary)]">
          <span className="material-symbols-outlined text-5xl leading-none">lock</span>
        </div>

        {/* Title */}
        <h2 className="text-xl text-center text-[var(--color-text-secondary)]">
          Protected Page
        </h2>

        {/* Body */}
        <p className="text-base text-center text-[var(--color-text-secondary)] font-normal">
          Please enter the password below to view this project.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Input Wrapper */}
          <div className="relative w-full flex items-center pt-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              className="
                w-full h-10 text-base rounded-lg border-2 border-[var(--color-border-muted)]
                pr-10 pl-4 font-[Inter,system-ui] font-normal
                focus:outline-none focus:border-[var(--color-text-link)]
              "
            />
            <span
              onClick={() => setShowPassword((v) => !v)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setShowPassword((v) => !v); }}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={0}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                cursor-pointer text-[var(--color-border-muted)] text-2xl select-none
                flex items-center justify-center bg-transparent rounded-[10%]
                transition-colors duration-300
                hover:text-[var(--color-text-secondary)]
              "
            >
              <span className="material-symbols-outlined text-2xl leading-none">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </span>
          </div>

          {/* Button Row */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                px-4 h-10 text-base rounded-full border-none
                flex items-center justify-center
                text-[var(--color-text-secondary)] cursor-pointer
                font-bold font-[Inter,system-ui] whitespace-nowrap
                transition-all duration-200
                max-[768px]:h-8 max-[768px]:text-[0.9rem]
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="
                px-4 h-10 text-base rounded-full border-none
                flex items-center justify-center
                bg-[var(--color-intent-positive)] text-[var(--color-text-inverse)]
                cursor-pointer whitespace-nowrap
                transition-colors duration-200
                hover:brightness-90
                max-[768px]:h-8 max-[768px]:text-[0.9rem]
              "
            >
              Submit
            </button>
          </div>
        </form>

        {error && (
          <div
            className="
              bg-[var(--color-bg-negative)] text-[var(--color-text-secondary)]
              rounded-lg text-[0.8rem] py-3 px-4 mx-auto
              text-center w-fit max-w-[90%] flex justify-center items-center
            "
          >
            Incorrect password. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
