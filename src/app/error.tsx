'use client'
import React from 'react'
import img from '../../public/Capture d’écran 2024-04-09 à 11.33.56.png'
import Image from 'next/image'
export default function error() {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Image src={img} alt='page.Error 404 ...' />
    </div>
  )
}
