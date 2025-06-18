import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PostPhotos = ({
  post,
  isModal = false,
  isProfile = false,
  onPhotoClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);

  const reactColorBg = isProfile
    ? "bg-[var(--home-card)]"
    : "bg-[var(--photo-bg)]";

  const renderPhotos = (photos) => {
    const wrapperClasses = isModal ? "w-full h-full" : "w-full aspect-4/3";

    if (photos.length === 1) {
      return (
        <div className={wrapperClasses} onClick={() => onPhotoClick(0)}>
          <img
            src={photos[0]}
            alt="Post"
            className="w-full h-full object-contain rounded-lg bg-[var(--photo-bg)] cursor-pointer"
          />
        </div>
      );
    }

    return (
      <div className={`relative ${wrapperClasses}`}>
        <Carousel
          className={`w-full ${isModal ? "h-full" : ""}`}
          setApi={(api) => {
            setTotalSlides(api.scrollSnapList().length);
            api.on("select", () => {
              setCurrentSlide(api.selectedScrollSnap() + 1);
            });
          }}
        >
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className={`flex justify-center items-center ${
                  isModal ? "lg:h-[70vh] p-3" : "aspect-[4/3]"
                }`}
              >
                <div
                  onClick={() => onPhotoClick(index)}
                  className="cursor-pointer w-full h-full"
                >
                  <img
                    src={photo}
                    alt={`Photo ${index}`}
                    className={`w-full h-full ${
                      isModal
                        ? "object-contain w-full aspect-4/3 "
                        : "object-contain"
                    } rounded-lg ${reactColorBg}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute top-4 right-4 z-1">
          <div className="bg-[var(--home-card)] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span>{currentSlide}</span>
            <span>/</span>
            <span>{totalSlides}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full h-full ${
        isModal
          ? "object-cover object-center lg:h-[70vh]"
          : "mt-4 mb-2 object-contain"
      } rounded-lg ${reactColorBg}`}
    >
      {post?.photos?.length > 0 && (
        <div className={`${isModal ? "h-full " : ""}`}>
          {renderPhotos(post.photos)}
        </div>
      )}
    </div>
  );
};

export default PostPhotos;
