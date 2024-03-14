"use client";

import Image from "next/image";
import placeholder from "@/public/placeholder.svg";
import { useState } from "react";
import { Post } from "@prisma/client";

type PostImagesProps = {
  post: Post;
};

const S3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

export const PostImages: React.FC<PostImagesProps> = ({ post }) => {
  const { images, title } = post;
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="flex max-h-[500px] flex-col border-b pb-6 lg:flex-row lg:space-x-6">
      <div className="flex justify-center lg:w-4/5">
        <div className="h-full overflow-hidden rounded-lg">
          <Image
            src={S3BaseUrl + "/" + currentImage || placeholder}
            alt={title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "100%" }}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2 overflow-y-auto lg:w-1/5">
        {images.map((image, index) => (
          <div
            key={index}
            className={`shrink-0 cursor-pointer overflow-hidden rounded-lg ${
              currentImage === image ? "border-4 border-blue-500" : ""
            }`}
            onClick={() => setCurrentImage(image)}
          >
            <Image
              src={S3BaseUrl + "/" + image || placeholder}
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
