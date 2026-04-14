import React from "react";
import Link from "next/link";

const ProjectLinksComponent = ({ cards, onCardClick, onProtectedCardClick }) => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[20rem] mx-auto min-[1000px]:max-w-none">
      {cards.map((card, index) => {
        const isExternal = card.linkTo.startsWith("http");

        const handleInternalClick = (e) => {
          if (card.passwordProtected) {
            e.preventDefault();
            onProtectedCardClick(card);
          }
        };

        const linkClasses = `
          text-[1.1rem] font-semibold underline underline-offset-[3px]
          cursor-pointer transition-opacity duration-200
          text-[var(--color-text-primary)]
          hover:opacity-65
        `;

        return (
          <div
            key={index}
            className="
              flex items-start flex-col flex-wrap gap-[0.6rem] py-[0.4rem] whitespace-nowrap text-left
              min-[1000px]:flex-row min-[1000px]:flex-nowrap min-[1000px]:items-center
            "
          >
            {isExternal ? (
              <a
                href={card.linkTo}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
              >
                {card.title}
              </a>
            ) : (
              <Link href={card.linkTo} passHref legacyBehavior>
                <a onClick={handleInternalClick} className={linkClasses}>
                  {card.title}
                </a>
              </Link>
            )}
            <div className="flex flex-nowrap gap-[0.4rem] items-center">
              {card.tags &&
                card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      rounded-full py-[0.15rem] px-[0.65rem]
                      text-xs font-bold uppercase tracking-wide whitespace-nowrap
                      bg-[var(--color-tag-bg)]
                      text-[var(--color-text-secondary)]
                    "
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectLinksComponent;
