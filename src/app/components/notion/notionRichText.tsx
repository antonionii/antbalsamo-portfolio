import React from "react";
import type { NotionRichText } from "../../types/notion";

/* ============================================
   Notion Rich Text Helpers
   Shared by Blocks and Blogs page renderers.

   textAnnotations — applies bold/italic/underline/code/color
   textLink        — wraps annotated spans in <a> if href exists
   ============================================ */

/** Apply Notion text annotations as inline styles. */
export const textAnnotations = (text: NotionRichText): React.ReactNode => {
  const { annotations, plain_text } = text;
  const style: React.CSSProperties = {};
  if (annotations.bold) style.fontWeight = "bold";
  if (annotations.italic) style.fontStyle = "italic";
  if (annotations.underline) style.textDecoration = "underline";
  if (annotations.code) style.fontFamily = "monospace";
  if (annotations.color) style.color = annotations.color;
  if (annotations.background_color) style.backgroundColor = annotations.background_color;
  return <span style={style}>{plain_text}</span>;
};

/**
 * Render an array of Notion rich text spans, wrapping linked spans in <a> tags.
 * @param linkClassName — optional className applied to <a> tags (e.g. for link color/font)
 */
export const textLink = (
  richTextArray: NotionRichText[],
  linkClassName = "underline",
): React.ReactNode[] => {
  return richTextArray.map((text, index) => {
    if (text.href) {
      return (
        <a
          key={index}
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {textAnnotations(text)}
        </a>
      );
    }
    return <span key={index}>{textAnnotations(text)}</span>;
  });
};

/** Render plain text only (no links, no annotations). */
export const renderRichText = (richTextArray: NotionRichText[]): React.ReactNode[] => {
  return richTextArray.map((text, index) => (
    <span key={index}>{text.plain_text}</span>
  ));
};
