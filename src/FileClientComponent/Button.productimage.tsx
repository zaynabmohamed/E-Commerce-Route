"use client";
import Image from "next/image";
import { useState } from "react";

export default function Buttonproductimage( { images, title}: { images: string[]; title: string ;}) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white mb-4">
        <Image 
          width={600} 
          height={600} 
          src={images[selectedImage]} 
          alt={title}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? "border-blue-500" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <Image 
              width={300} 
              height={300}
              src={image}
              alt={`${title} ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

