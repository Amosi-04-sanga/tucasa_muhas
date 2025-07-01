"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import moment from "moment";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
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
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-2xl font-bold text-center my-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-xl font-semibold my-3">{children}</h2>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-base leading-relaxed my-2">{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, file } = node.data.target.fields;
        const imageUrl = file?.url?.startsWith("//")
          ? "https:" + file.url
          : file.url;

        return (
          <img
            src={imageUrl}
            alt={title || "Embedded asset"}
            className="my-4 mx-auto max-w-full rounded"
          />
        );
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      ),
    },
  };
  

  return (
    <div className="">
      {data ? (
        <div className=" p-4 mx-auto px-[40px] max-w-[800px]">
          <section className="mt-10 mx-auto ">
            <div className="max-w-[500px]  mx-auto">
              <img
                src={data.fields.poster.fields.file.url}
                alt="featured image"
                className="block"
              />
            </div>

            <div className="mt-4">
              {documentToReactComponents(data.fields.content, options)}
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
