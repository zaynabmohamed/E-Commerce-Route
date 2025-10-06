"use client";
import Image from "next/image";
import { useState } from "react";
export default function Buttonproductimage( { images, title}: { images: string[]; title: string ;}) {
  const [selectedImage, setSelectedImage] = useState(1);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() =>{ setSelectedImage(index)
             
            }}
            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
              selectedImage === index ? "border-primary" : "border-white"
            }`}
          >
            <Image width={500} height={500}
              src={image}
              alt={`${title} ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Image width={500} height={500} src={images[selectedImage]} alt="Selected" className="w-80 h-80 object-cover" />
      </div>
    </div>
  );
}

