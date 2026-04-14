"use client";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeaderText from "../../components/PageHeaderText";
import { ModalContext } from "../../layout";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Image from 'next/image';

const Blogs = () => {
    const router = useRouter();
    const { pageId } = useParams();
    const [title, setTitle] = useState("");
    const [numOfItems, setNumOfItems] = useState(4);
    const [metadata, setMetadata] = useState(null);
    const [blockData, setBlockData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { openImageModal } = useContext(ModalContext);
    const [isClient, setIsClient] = useState(false);
    const [accentTextColor, setAccentTextColor] = useState("");

    useEffect(() => {
        setIsClient(true);
        const searchParams = new URLSearchParams(window.location.search);
        const queryTitle = searchParams.get('title');
        if (queryTitle) {
            setTitle(queryTitle);
            const wordArray = queryTitle.split(" ");
            setNumOfItems(wordArray.length + 2);
        }
        if (typeof window !== "undefined") {
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-accent').trim();
            setAccentTextColor(accentColor);
        }
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
                        className="text-[var(--color-text-link)] text-[1.2rem] underline"
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
        const filteredProperties = Object.keys(metadata.properties).filter((key) => key !== "Project");

        return filteredProperties.map((key) => {
            const property = metadata.properties[key];
            let valueContent = null;

            switch (property.type) {
                case "date":
                    if (property.date && property.date.start) {
                        const [year, month, day] = property.date.start.split('-');
                        const dateObj = new Date(year, month - 1, day);
                        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
                        valueContent = <span>{formattedDate}</span>;
                    } else {
                        valueContent = <span>Unknown Date</span>;
                    }
                    break;
                default:
                    valueContent = <span>Unsupported property type</span>;
            }

            return (
                <div key={property.id} className="grid grid-cols-[1fr_2fr] items-center">
                    <div className="font-medium text-[1.2rem] text-[var(--color-text-secondary)]">
                        {valueContent}
                    </div>
                </div>
            );
        });
    };

    const nestBlock = (block) => {
        switch (block.type) {
            case 'paragraph':
                return (
                    <p className="leading-[1.7rem] text-[var(--color-text-accent)] font-medium text-[1.2rem] [&_b]:font-bold [&_i]:italic [&_u]:underline [&_code]:p-[0.2rem] [&_code]:rounded">
                        {textLink(block.paragraph.rich_text)}
                    </p>
                );
            case 'heading_1':
                return (
                    <h1 key={block.id} className="text-[2.5rem] text-[var(--color-text-secondary)] font-bold bg-[var(--color-bg-surface-alt)] rounded-xl py-2 px-4">
                        {textLink(block.heading_1.rich_text)}
                    </h1>
                );
            case 'heading_2':
                return (
                    <h2 key={block.id} className="text-[2.2rem] mb-[2.4rem] font-bold leading-[1.4] text-[var(--color-text-secondary)]">
                        {textLink(block.heading_2.rich_text)}
                    </h2>
                );
            case 'heading_3':
                return (
                    <h3 key={block.id} className="text-[1.75rem] leading-[1.5] text-[var(--color-text-secondary)]">
                        {textLink(block.heading_3.rich_text)}
                    </h3>
                );
            case "image": {
                const imageFile = block.image.type === "external" ? block.image.external.url : block.image.file.url;
                return (
                    <div key={block.id} className="text-center max-w-full w-full mx-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:cursor-zoom-in hover:[&_img]:opacity-[0.96]">
                        <Image src={imageFile} alt="image file" onClick={() => openImageModal(imageFile)} />
                    </div>
                );
            }
            case 'callout':
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
            case 'bulleted_list_item':
                return (
                    <ul key={block.id} className="list-disc pl-3 text-[var(--color-text-secondary)] [&_li]:mx-4 [&_li]:pr-8 [&_li]:pl-4 [&_li]:font-medium [&_li]:text-[1.2rem]">
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
                    <div className="flex flex-col gap-4 bg-[var(--color-bg-surface-alt)] rounded-md py-2 px-8">
                        {block.children.map((childBlock) => nestBlockChild(childBlock, isCallout))}
                    </div>
                ) : (
                    block.children && block.children.map((childBlock) => nestBlockChild(childBlock, parentIsCallout))
                )}
            </div>
        );
    };

    const itemsTextArray = title ? title.split(" ") : ["🐸", "Loading...", "🐸"];

    return (
        <>
            <div className="text-center">
                <div className="mt-16">
                    <PageHeaderText
                        numOfItems={numOfItems}
                        itemsText={["✏️", ...itemsTextArray, "✏️"]}
                        fontSize="1.4rem"
                        fontColor={accentTextColor}
                    />
                </div>
            </div>

            {metadata && metadata.coverImage && (
                <div
                    className="w-screen h-[calc(100vh/3)] bg-no-repeat bg-cover relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
                    style={{
                        backgroundImage: `url(${metadata.coverImage})`,
                        backgroundPosition: '0% 15%',
                    }}
                />
            )}

            <div
                className="
                    flex flex-col w-[90%] justify-center items-center p-8 mx-auto mt-16 overflow-hidden
                    md:w-[65%] md:mx-auto md:mt-16 md:px-8 md:pb-8 md:pt-0
                    xl:w-[45%] xl:mx-auto xl:mt-0 xl:p-8 xl:pt-16
                "
            >
                {metadata ? (
                    <div className="flex flex-col gap-8 w-full">
                        <div className="flex justify-start">
                            <div className="text-[var(--color-text-secondary)]">
                                <div className="grid gap-4">{renderProperties()}</div>
                            </div>
                        </div>
                        <div className="w-full h-px bg-[var(--color-text-muted)] opacity-40" />
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
        </>
    );
};

export default Blogs;
