"use client";
import React, { useEffect, useState } from "react";

const Articles = () => {
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch("/api/notion");
        const data = await response.json();
        if (response.ok) {
          setPageData(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch data from Notion");
      }
    };

    fetchPageData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Notion Page Data</h1>
      {pageData ? (
        <div>
          {/* <h2>{pageData.properties.title.title[0].plain_text}</h2> */}
          
          <p>
            Page created on: {new Date(pageData.created_time).toLocaleString()}
          </p>
          <p>
            Last edited on:{" "}
            {new Date(pageData.last_edited_time).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Articles;