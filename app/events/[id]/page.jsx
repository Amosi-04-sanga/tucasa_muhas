"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import moment from "moment";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const entry = React.use(params);

  useEffect(() => {
    const getitems = async () => {
      const client = createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: `ahfy535kiwrz`,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: `lVEGHUiroVhnML2fAuXGDyqXaHnwa7gd9dopLdWuSso`,
      });

      client
        .getEntry(entry.id)
        .then((entry) => {
          setData(entry);
          console.log(entry);
        })
        .catch(console.error);
    };
    getitems();
  }, []);

  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file.url;
        const altText = title || "";

        return (
          <img
            className="max-w-[60vw] mx-auto"
            src={imageUrl}
            alt={altText}
            style={{ margin: "16px auto" }}
          />
        );
      },
      "embedded-entry-block": (node) => {
        // Handle other embedded entries, e.g., links to other Contentful content.
        // You can customize the rendering for different content types here.
        return null;
      },
      text: (text) => {
        // You can style text nodes here, e.g., adding CSS classes for headings.
        return (
          <p style={{ paddingTop: "10px" }} className="mt-4">
            {text}
          </p>
        );
      },
      "heading-1": (node) => (
        <h1 className="text-center text-heading1-bold">
          {node.content[0].value}
        </h1>
      ),
      "heading-2": (node) => (
        <h2 className="text-center text-heading2-bold">
          {node.content[0].value}
        </h2>
      ),
      "heading-3": (node) => (
        <h3 className="text-heading3-bold text-center">
          {node.content[0].value}
        </h3>
      ),
      // Add more heading levels as needed.
      hyperlink: (node) => (
        <Link className="text-red-700" href={node.data.uri}>
          {node.content[0].value}
        </Link>
      ),
    },
  };

  return (
    <div className="">
      {data ? (
        <div className=" p-4 mx-auto max-w-[800px]">
          <section className="mt-10 mx-auto ">
            <div className="max-w-[500px]  mx-auto">
              <img
                src={data.fields.poster.fields.file.url}
                alt="featured image"
                className="block"
              />
            </div>

            <div className="mt-4">
              <p> {data.fields.description} </p>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="w-full h-[70vh] flex items-center justify-center">
            <SyncLoader color="#008080" />
          </div>
        </>
      )}
    </div>
  );
};

export default page;


