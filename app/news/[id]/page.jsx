"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import moment from "moment";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SyncLoader } from "react-spinners";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const entry = React.use(params);

  useEffect(() => {
    const Getitems = async () => {
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
    Getitems();
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
    <div className="block">
      {data ? (
        <div className=" mx-auto px-4 md:px-40">
          <section className="mt-10">
            <h1
              style={{ fontSize: "30px" }}
              className="uppercase font-bold text-center"
            >
              {" "}
              {data.fields.title}{" "}
            </h1>

            <div className="mt-4">
              <p> {data.fields.description} </p>
            </div>
          </section>
        </div>
      ) : (
        <>
          <div className="w-full h-[60vh] flex items-center justify-center">
            <SyncLoader color="#008080" />
          </div>
        </>
      )}
    </div>
  );
};

export default page;

/*
<div style={{fontSize: '14px'}} className="flex gap-4 justify-between text-small-regular mt-2">
              <div>
                <p className="italic">
                  Published On:{" "}
                  <span className="italic">
                    {" "}
                    {moment(data.fields.publishedDate).format(
                      "MMM Do YYYY"
                    )}{" "}
                  </span>
                </p>
              </div>
              <p>
                <span style={{color: 'green'}} className="font-bold uppercase text-[14px] ">
                  {data.fields.eventDate && (
                    <>{moment(data.fields.eventDate).fromNow()} </>
                  )}
                </span>{" "}
              </p>
            </div>


            <div className="mt-4">
              {documentToReactComponents(data.fields.description, options)}
            </div>
*/
