import Image from "next/image";
import { Daum } from '@/Types/Brand.Type';
import Link from "next/link";

export default async function LimtBrands(){
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=7`,{
    cache:"no-store",
    method: "GET",
  })
  const {data} = await res.json();
  console.log(data)

  return (
    <>
      <div className="w-full">
        <h2 className='text-xl sm:text-2xl md:text-3xl text-black py-4 sm:py-6 px-4'>Show Popular Brands</h2>
        
        <div className="w-full px-3 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-6">
            {data.map((product :Daum) => (
              <div key={product._id} className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
                <div className="bg-white p-2 sm:p-3">
                  <Image
                    width={300}
                    height={300}
                    src={product.image}
                    alt={product.name}
                    className='w-full h-24 sm:h-28 md:h-32 object-contain'
                  />
                  <div className='flex justify-center py-2 sm:py-3 px-1  bg-black text-white text-xs sm:text-sm font-semibold text-center mt-2 rounded truncate'>
                    {product.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Link href={`/Brands`} className="text-base sm:text-lg md:text-xl bg-blue-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
              Show More
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}