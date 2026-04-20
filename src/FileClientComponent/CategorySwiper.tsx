'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import CategoryType from './../Types/Category.Type';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CategorySwiper({Categories} :{Categories:CategoryType[]}) {
  return (
    <div className="mb-6 w-full px-3 sm:px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={8}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 12 },
          1024: { slidesPerView: 4, spaceBetween: 14 },
          1280: { slidesPerView: 5, spaceBetween: 16 }
        }}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
        {Categories?.map((category:CategoryType)=> 
          <SwiperSlide key={category._id}>
            <div className='bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition p-2 sm:p-3'>
              <Image 
                width={300} 
                height={300} 
                src={category.image} 
                alt={category.name}
                className='w-full h-28 sm:h-32 md:h-40 object-contain'
              />
              <p className='text-center text-xs sm:text-sm font-bold text-gray-800 mt-2 truncate px-2'>
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}
