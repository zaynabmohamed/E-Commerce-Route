'use client'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MainSlider() {
  return (
    <div className='mb-8 sm:mb-10 w-full px-0'>
      <div className='w-full sm:w-[95%] md:w-[90%] mx-auto'>
        <Swiper
          className='w-full rounded-lg overflow-hidden'
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          <SwiperSlide>
            <Image
              src="/Best-online-clothing-store-in-Egypt-1024x576image(1).jpg"
              alt="Slide 1"
              width={1200}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
              priority
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/pngtree-essential-tech-a-collection-of-computers-devices-and-office-equipment-including-image_3748457(10).jpg"
              alt="Slide 2"
              width={1200}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/unnamed.slide-4.jpg"
              alt="Slide 3"
              width={1200}
              height={400}
              className="rounded-lg w-full h-auto object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
 
