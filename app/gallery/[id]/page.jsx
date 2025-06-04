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
import { Fade } from "react-awesome-reveal";
import { images } from "@/src/images";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const entry = React.use(params);
  const { download, tiktok } = images;

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

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

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
    <div className="px-2 md:px-2 mt-8 mb-8 ">
      <h1 className="mt-8 uppercase text-primary-dark max-sm:text-center">
        {" "}
        {data && data.fields.title}{" "}
      </h1>
      <div className="flex flex-wrap max-sm:justify-center gap-1 mt-4">
        {data && data.fields.photos.length > 0 ? (
          data.fields.photos.map((photo, index) => (
            <Fade delay={index * 100} key={index}>
              <div className="relative h-[150px] w-[170px] bg-orange-100">
                <img
                  src={photo.fields.file.url}
                  alt={`cover_image`}
                  className="w-full h-full object-cover block"
                />

                <div
                  onClick={() =>
                    handleDownload(
                      photo.fields.file.url,
                      photo.fields.file.url.split("/").pop()
                    )
                  }
                  className="absolute right-0 bottom-0 z-20 bg-primary-light p-1 rounded-full"
                >
                  <img
                    src={download}
                    alt={`download`}
                    className="w-[20px] h-[20px] object-cover block"
                  />
                </div>
              </div>
            </Fade>
          ))
        ) : (
          <>
            <div className="w-full h-[60vh] flex items-center justify-center">
              <SyncLoader color="#008080" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;

/*

*/
