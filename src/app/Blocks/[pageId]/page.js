"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import PageHeaderText from "../../components/PageHeaderText";
import { ModalContext } from "../../layout";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Image from 'next/image';
import { PageContainer } from "../../styles/PageContainer";

const Blocks = () => {
  const { pageId } = useParams();
  const [metadata, setMetadata] = useState(null);
  const [blockData, setBlockData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openImageModal } = useContext(ModalContext);
  const [isClient, setIsClient] = useState(false);
  const linkColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-link').trim();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (pageId) {
      const fetchBlockData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/blocks?pageId=${pageId}`);
          const data = await res.json();
          if (res.ok) {
            setMetadata(data.metadata);
            setBlockData(data.blocks);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlockData();
    }
  }, [pageId]);

  const textLink = (richTextArray) => {
    return richTextArray.map((text, index) => {
      if (text.href) {
        return (
          <a
            key={index}
            href={text.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base underline"
          >
            {textAnnotations(text)}
          </a>
        );
      } else {
        return <span key={index}>{textAnnotations(text)}</span>;
      }
    });
  };

  const textAnnotations = (text) => {
    const { annotations, plain_text } = text;
    let style = {};
    if (annotations.bold) style.fontWeight = 'bold';
    if (annotations.italic) style.fontStyle = 'italic';
    if (annotations.underline) style.textDecoration = 'underline';
    if (annotations.code) style.fontFamily = 'monospace';
    if (annotations.color) style.color = annotations.color;
    if (annotations.background_color) style.backgroundColor = annotations.background_color;
    return <span style={style}>{plain_text}</span>;
  };

  const renderRichText = (richTextArray) => {
    return richTextArray.map((text, index) => {
      const { plain_text } = text;
      return <span key={index}>{plain_text}</span>;
    });
  };

  const renderProperties = () => {
    if (!metadata || !metadata.properties) return null;
    const propertyOrder = ["Role", "Product", "Company", "Time", "User Persona Roles", "Status"];

    return propertyOrder.map((key) => {
      const property = metadata.properties[key];
      if (!property) return null;

      let valueContent = null;
      switch (property.type) {
        case "rich_text":
          valueContent = renderRichText(property.rich_text);
          break;
        case "status":
          valueContent = <span>{property.status?.name || "Unknown"}</span>;
          break;
        default:
          valueContent = <span>Unsupported property type</span>;
      }

      return (
        <div key={property.id} className="grid grid-cols-[1fr_2fr] items-center">
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-medium text-[0.8rem]">
            <span className="material-symbols-outlined">subject</span>
            {key}
          </div>
          <div className="font-medium text-[0.8rem] text-[var(--color-text-primary)]">
            {valueContent}
          </div>
        </div>
      );
    });
  };

  const nestBlock = (block) => {
    switch (block.type) {
      case "image": {
        const imageFile =
          block.image.type === "external"
            ? block.image.external.url
            : block.image.file.url;

        const caption = block.image.caption || [];
        const altText = caption.map((item) => item.plain_text).join("") || "Project image";
        const hyperlink = caption.find((item) => item.href)?.href;
        const linkName = hyperlink
          ? decodeURIComponent(hyperlink.split("/").pop().split("?")[0])
              .replace(/-/g, " ")
              .replace(/_/g, " ")
          : "";

        if (hyperlink) {
          return (
            <div key={block.id} className="relative text-center mx-auto max-w-full inline-block cursor-default [&_img]:max-w-full [&_img]:h-auto [&_img]:block group">
              <a href={hyperlink} target="_blank" rel="noopener noreferrer">
                <Image src={imageFile} alt={altText} width={800} height={600} layout="responsive" />
                <div className="absolute inset-0 flex flex-col gap-1 justify-end items-start p-2 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-base">🔗</span>
                  <span className="text-base capitalize whitespace-nowrap">{linkName}</span>
                </div>
              </a>
            </div>
          );
        }

        return (
          <div key={block.id} className="relative text-center mx-auto max-w-full inline-block cursor-zoom-in [&_img]:max-w-full [&_img]:h-auto [&_img]:block">
            <Image
              src={imageFile}
              alt={altText}
              width={800}
              height={600}
              layout="responsive"
              onClick={() => openImageModal(imageFile)}
            />
          </div>
        );
      }
      case "paragraph":
        return (
          <p className="leading-6 text-[var(--color-text-secondary)] font-medium text-base [&_b]:font-bold [&_i]:italic [&_u]:underline [&_code]:p-[0.2rem] [&_code]:rounded">
            {textLink(block.paragraph.rich_text)}
          </p>
        );
      case "heading_1":
        return (
          <h1 key={block.id} className="text-[2rem] text-[var(--color-text-secondary)] font-bold bg-[var(--color-bg-surface)] rounded-xl py-2 px-4">
            {textLink(block.heading_1.rich_text)}
          </h1>
        );
      case "heading_2":
        return (
          <h2 key={block.id} className="text-[1.4rem] underline font-bold leading-none text-[var(--color-text-secondary)]">
            {textLink(block.heading_2.rich_text)}
          </h2>
        );
      case "heading_3":
        return (
          <h3 key={block.id} className="text-[1.2rem] leading-[1.4] text-[var(--color-text-secondary)]">
            {textLink(block.heading_3.rich_text)}
          </h3>
        );
      case "callout":
        if (block.callout.rich_text.length > 0) {
          return (
            <div style={{ backgroundColor: block.callout.color }}>
              {block.callout.icon && <span>{block.callout.icon.emoji}</span>}
              {block.callout.rich_text.map((text, index) => (
                <span key={index}>{text.plain_text}</span>
              ))}
            </div>
          );
        } else {
          return null;
        }
      case "bulleted_list_item":
        return (
          <ul key={block.id} className="list-disc pl-3 text-[var(--color-text-secondary)] [&_li]:mx-4 [&_li]:pr-8 [&_li]:pl-4 [&_li]:font-medium [&_li]:text-base">
            <li>{textLink(block.bulleted_list_item.rich_text)}</li>
          </ul>
        );
      default:
        return null;
    }
  };

  const nestBlockChild = (block, parentIsCallout = false) => {
    const isCallout = block.type === 'callout';

    return (
      <div key={block.id}>
        {nestBlock(block)}
        {isCallout && block.children && block.children.length > 0 ? (
          <div className="flex flex-col gap-4 bg-[var(--color-bg-surface)] rounded-md py-4 px-8">
            {block.children.map((childBlock) => nestBlockChild(childBlock, isCallout))}
          </div>
        ) : (
          block.children && block.children.map((childBlock) => nestBlockChild(childBlock, parentIsCallout))
        )}
      </div>
    );
  };

  return (
    <>
      {metadata && metadata.coverImage && (
        <div
          className="w-screen h-[calc(100vh/3)] bg-center bg-no-repeat bg-cover relative"
          style={{ backgroundImage: `url(${metadata.coverImage})` }}
        />
      )}
      <PageContainer className="pt-0">
        <div
          className="
            flex flex-col gap-12 w-full items-center p-0 overflow-hidden
            md:w-[65%] md:mx-auto md:px-4
            xl:w-[65%]
          "
        >
          {metadata ? (
            <div className="w-full flex justify-start">
              <div className="flex flex-col gap-4 text-[var(--color-text-primary)]">
                <h1 className="text-[2rem] text-[var(--color-text-accent)] text-left">
                  {metadata.title}
                </h1>
                {metadata.icon && <div className="text-base text-[var(--color-text-secondary)]">{metadata.icon}</div>}
                <div className="grid gap-2">{renderProperties()}</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <ClimbingBoxLoader color="var(--color-text-secondary)" size={25} />
            </div>
          )}
          {blockData.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <ClimbingBoxLoader color="var(--color-text-secondary)" size={25} />
            </div>
          ) : (
            <div className="flex flex-col gap-4">{blockData.map((block) => nestBlockChild(block))}</div>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default Blocks;
