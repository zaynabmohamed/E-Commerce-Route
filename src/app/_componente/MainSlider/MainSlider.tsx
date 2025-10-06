'use client'
import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 export default function MainSlider() {
//[ i used here library swiper.js (Slider) this is use client and to make i Image.next and add width , height by hands across the img in src not import]
   return (
     <div className=' mb-10 flex'>
       <div className='w-[85%] mx-auto'>
        <Swiper
        className='w-[100%] mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
      <SwiperSlide>
   <Image
  src="/Best-online-clothing-store-in-Egypt-1024x576image(1).jpg"
  alt="Slide 1"
  width={800}
  height={400}
  className="rounded-lg  w-full"/>
      </SwiperSlide>
      <SwiperSlide>
         <Image
  src="/pngtree-essential-tech-a-collection-of-computers-devices-and-office-equipment-including-image_3748457(10).jpg"
  alt="Slide 2"
  width={800}
  height={400}
  className="rounded-lg  w-full"/>
</SwiperSlide>
      <SwiperSlide>
         <Image
  src="/unnamed.slide-4.jpg"
  alt="Slide 3"
  width={800}
  height={400}
  className="rounded-lg object-fill w-full"/>
</SwiperSlide>
    </Swiper>
       </div>
     </div>
   )
 }
 