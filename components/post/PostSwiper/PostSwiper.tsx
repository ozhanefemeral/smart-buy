"use client";

import { PostCard } from "@/components/post/PostCard/";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { Post } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type PostSwiperProps = {
  posts: Post[];
};

const maxSlideCount = 4.25;

export const PostSwiper = ({ posts }: PostSwiperProps) => {
  let { width } = useMediaQuery();

  if (!width) width = 0;
  const slidesPerView = width / (300 + 40) + 0.25;

  return (
    <Swiper
      slidesPerView={
        slidesPerView > maxSlideCount ? maxSlideCount : slidesPerView
      }
      spaceBetween={20}
      className="w-full"
    >
      {posts.map((post, index) => (
        // pb-1 is added to fix the shadows clipping on the bottom
        <SwiperSlide key={index} className="pb-1">
          <PostCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
