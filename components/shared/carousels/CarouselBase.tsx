"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperOptions } from "swiper/types";

const EmptyView = ({ entity }: { entity: string }) => (
  <p>No {entity} found 😅</p>
);

interface CarouselProps<T> extends SwiperOptions {
  items: T[];
  title: string;
  slideItem: (item: T) => JSX.Element;
}

export const CarouselBase = <T,>({
  items,
  title,
  slideItem,
  ...props
}: CarouselProps<T>) => {
  const isEmpty = !items || items.length === 0;

  return (
    <div>
      <div className="pb-2 text-2xl font-bold">{title}</div>
      {isEmpty && <EmptyView entity={`${title}s`} />}
      <Swiper
        slidesPerView={props.slidesPerView || 3}
        spaceBetween={props.spaceBetween || 30}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`carousel-slide-${index}`}>
            {slideItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
