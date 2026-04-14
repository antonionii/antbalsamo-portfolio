import React from "react";
import Link from "next/link";

const CardComponent = ({ cards, onCardClick, onProtectedCardClick }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-16 w-full max-w-[60rem] mx-auto">
      {cards.map((card, index) => {
        const isExternal = card.linkTo.startsWith("http");

        let formattedText = card.text;
        for (let i = 0; i < card.lineBreaks; i++) {
          formattedText += '<br />';
        }

        const handleInternalClick = (e) => {
          if (card.passwordProtected) {
            e.preventDefault();
            onProtectedCardClick(card);
          }
        };

        const cardContent = (
          <div className="flex flex-col gap-3">
            <h4 className="text-[1.3rem] whitespace-nowrap overflow-hidden text-ellipsis text-[var(--color-text-secondary)]">
              {card.title}
            </h4>
            <div className="flex flex-wrap gap-2">
              {card.tags && card.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[var(--color-tag-bg)] text-[var(--color-text-secondary)] rounded-full py-[0.2rem] px-[0.8rem] text-[0.85rem] font-semibold inline-block"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p
              className="text-base text-[var(--color-text-secondary)] font-medium [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
            {/* Image bleeds outside card padding — negative margins are an intentional one-off */}
            <img
              src={card.image}
              alt={card.title}
              className="w-[calc(100%+4rem)] max-h-56 -ml-8 -mr-8 object-cover grow"
            />
            <div className="border-[6px] rounded-md p-[0.7rem] w-auto max-w-[65%] mx-auto flex justify-center items-center bg-[var(--color-bg-base)] transition-all duration-300">
              <h4 className="text-[1.4rem] text-[var(--color-text-primary)]">
                {card.bubbleText}
              </h4>
            </div>
          </div>
        );

        const cardClasses = `
          bg-[var(--color-bg-surface)] rounded-xl px-8 py-4 text-left h-auto w-full
          shadow-[1rem_0.6rem_0_0_var(--color-shadow)]
          hover:shadow-[2rem_1rem_0_0_var(--color-shadow)] hover:-translate-y-4
          hover:border-[var(--color-border-default)] hover:border-[0.6rem]
          transition-all duration-300
          max-[779px]:shadow-none max-[779px]:hover:shadow-none
        `;

        return isExternal ? (
          <a
            href={card.linkTo}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="no-underline text-inherit block"
          >
            <div className={cardClasses}>
              {cardContent}
            </div>
          </a>
        ) : (
          <Link href={card.linkTo} passHref key={index} legacyBehavior>
            <a onClick={handleInternalClick} className="no-underline text-inherit block">
              <div className={cardClasses}>
                {cardContent}
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default CardComponent;
