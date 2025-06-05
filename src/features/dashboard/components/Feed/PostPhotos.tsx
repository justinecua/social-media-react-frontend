import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const PostPhotos = ({ post }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);

  const renderPhotos = (photos) => {
    if (photos.length === 1) {
      return (
        <div className="w-full h-full aspect-[4/3]">
          <img
            src={photos[0]}
            alt="Post"
            className="w-full h-full object-contain rounded-lg bg-[var(--button-bg-color)]"
          />
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-[4/3]">
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          onSwiper={(swiper) => setTotalSlides(swiper.slides.length)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
          className="w-full h-full"
        >
          {photos.map((photo, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <img
                src={photo}
                alt={`Photo ${index}`}
                className="w-full h-full object-contain rounded-lg bg-[var(--button-bg-color)]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-[var(--home-card)] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 ">
            <span>{currentSlide}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Middle ft w-full max-w-2xl px-2 mx-auto z-[2]">
      {post?.photos?.length > 0 && (
        <div className="my-2.5">{renderPhotos(post.photos)}</div>
      )}
    </div>
  );
};

export default PostPhotos;
