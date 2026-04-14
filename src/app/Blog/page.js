"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PageHeaderText from "../components/PageHeaderText";
import ProfileCard from "../components/ProfileCard";

const Blog = () => {
  const [colorForegroundTextDefault, setColorForegroundTextDefault] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const colorForegroundTextDefault = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim();
      setColorForegroundTextDefault(colorForegroundTextDefault);
    }
  }, []);

  const blogs = [
    {
      title: "~Personal Website Refresh~",
      link: "/Blogs/9d0ed34b21cf442a87542001fd9d07bc",
      date: "Sept 9, 2024",
    },
  ];

  const blogsIn2024 = blogs.filter((blog) => blog.date.includes("2024"));

  return (
    isClient && (
      <div className="min-h-[84vh] flex flex-col justify-between">
        <div className="text-center">
          {/* Header */}
          <div className="mt-16">
            <PageHeaderText
              numOfItems={4}
              itemsText={["✏️", "Occasionally", "Blogging", "✏️"]}
              fontSize="1.4rem"
            />
          </div>

          {/* Blog Section */}
          <div
            className="
              flex flex-col gap-4
              w-[80%] mx-auto mt-16 p-4 rounded-2xl overflow-hidden
              bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]
              md:w-[55%] md:px-8 md:pb-8 md:pt-0
              xl:w-[45%]
            "
          >
            {/* Year Header */}
            <div
              className="
                flex justify-between items-center
                max-[780px]:flex-col-reverse max-[780px]:items-end
              "
            >
              <ProfileCard
                numOfItems={2}
                itemsText={["2024"]}
                fontColor={colorForegroundTextDefault}
                className="text-left [&_h1]:text-[1.5rem] [&_h1]:text-left md:[&_h1]:text-[2.2rem] xl:[&_h1]:text-[3rem]"
              />
            </div>

            {/* Blog Entries */}
            {blogsIn2024.map((blog, index) => (
              <div key={index} className="flex justify-between items-center py-4">
                <Link
                  href={{
                    pathname: blog.link,
                    query: { title: blog.title }
                  }}
                  className="text-[1.2rem] text-[var(--color-text-link)] font-bold text-left pr-8 hover:underline"
                >
                  {blog.title}
                </Link>
                <span className="text-base text-[var(--color-text-accent)] text-right font-bold font-[Inter]">
                  {blog.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Blog;
