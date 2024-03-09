"use client";

import { PostCard } from "@/components/post/PostCard/";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { Post } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type PostSwiperProps = {
  posts: Post[];
};

const maxSlideCount = 4.1;

export const PostSwiper = ({ posts }: PostSwiperProps) => {
  let { width } = useMediaQuery();

  if (!width) width = 0;
  const slidesPerView = width / (300 + 40) + 0.1;

  return (
    <Swiper
      slidesPerView={
        slidesPerView > maxSlideCount ? maxSlideCount : slidesPerView
      }
      className="w-full"
    >
      {posts.map((post, index) => (
        <SwiperSlide key={index}>
          <PostCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
