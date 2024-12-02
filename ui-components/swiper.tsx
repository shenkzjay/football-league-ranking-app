"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Final from "@/public/imgs//final.jpeg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Memories() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="flex justify-center items-center w-full h-full rounded-xl">
          <video
            autoPlay
            muted
            loop
            className="!z-10relative w-full md:h-full h-[30vh] object-cover rounded-xl"
            src="/vid/telegram2.mp4"
          >
            <source src="/vid/cloud.mp4" type="video"></source>
          </video>
        </SwiperSlide>
        <SwiperSlide className="rounded-xl">
          {" "}
          <video
            autoPlay
            muted
            loop
            className="!z-10   relative w-full md:h-full h-[30vh] object-cover rounded-xl"
            src="/vid/cloud.mp4"
          >
            <source src="/vid/cloud.mp4" type="video"></source>
          </video>
        </SwiperSlide>
        {/* <SwiperSlide className="!h-24 flex">
          <div className="">
            <Image
              src={Final}
              width={500}
              height={50}
              quality={80}
              priority
              alt="image of winners showcasing their medals"
              className="w-full !md:h-[2rem] h-[20vh] object-cover object-center relative"
            ></Image>
          </div>
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
