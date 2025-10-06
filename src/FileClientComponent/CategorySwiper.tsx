'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CategoryType from './../Types/Category.Type';
import Image from 'next/image';
export default function CategorySwiper({Categories} :{Categories:CategoryType[]}) {
  return (
    
     <div className="mb-3  ">
       <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={3}
        slidesPerView={4}
        autoplay={{ delay: 2000 }}
        loop={true}
      >
      {Categories?.map((category:CategoryType)=> 
            <SwiperSlide key={category._id}>
              <Image width={500} height={500} src={category.image} alt='' className='h-[200px] object-contain justify-around '/>
              <p className='my-3  font-bold'>{category.name}</p>
      </SwiperSlide>
)}
      </Swiper>
    </div>
  )
}
