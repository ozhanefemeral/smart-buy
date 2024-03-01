"use client";

import { PostCard } from "@/components/post/PostCard/";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { Post } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";

type PostSwiperProps = {
  posts: Post[];
};

export const PostSwiper = ({ posts }: PostSwiperProps) => {
  let { width } = useMediaQuery();

  if (!width) width = 0;
  const slidesPerView = width / (300 + 40);

  return (
    <Swiper slidesPerView={slidesPerView}>
      {posts.map((post, index) => (
        <SwiperSlide key={index}>
          <PostCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
