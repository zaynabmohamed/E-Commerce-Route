import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ButtonAddToCart from "@/FileClientComponent/ButtonAddToCart";
import Link from "next/link";
import { ProductType } from "@/Types/Product.Type";
import ButtonAddToWishlist from "@/FileClientComponent/ButtonAddHeart";

export default async function LimtProducts(){
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=8`,{
    cache:"no-store",
    method: "GET",
  })
  const {data} = await res.json();
  console.log(data)

  return (
    <>
      <div className="w-full">
        <h2 className='flex justify-center py-6 px-4 bg-blue-900 text-white mx-auto text-xl sm:text-2xl md:text-3xl rounded-lg mb-6 sm:mb-8 w-full sm:w-[70%] md:w-[50%]'>
          Show Popular Products
        </h2>
        
        <div className="w-full px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8">
            {data.map((product: ProductType) => (
              <div key={product.id} className="flex flex-col">
                <Card className="p-3 sm:p-4 gap-3 flex flex-col h-full">
                  <div className='hover:text-red-500 transition text-lg '>
                    <ButtonAddToWishlist id={product.id}/>
                  </div>
                  <Link href={`/productDetails/${product.id}`} className="flex-1">
                    <CardHeader className="p-0 mb-2">
                      <Image
                        className='w-full h-40 sm:h-44 md:h-48 object-contain rounded-lg'
                        width={500}
                        height={500}
                        src={product.imageCover}
                        alt="Product image"
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-2 justify-between p-0 mb-2 text-xs sm:text-sm">
                      <p className="font-bold text-blue-800 truncate">
                        {product.category.name}
                      </p>
                      <p className="font-bold text-red-500 truncate">
                        {product.brand.name}
                      </p>
                    </CardContent>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                      {product.title}
                    </p>
                    <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between p-0 items-start sm:items-center">
                      <button className="bg-red-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                        {product.price} EGP
                      </button>
                      <p className="flex items-center gap-1 text-yellow-500 text-xs sm:text-sm">
                        <span>{product.ratingsAverage}</span>
                        <i className="text-yellow-300">
                          <IoStarSharp />
                        </i>
                      </p>
                    </CardFooter>
                  </Link>
                </Card>
                <div className="mt-2">
                  <ButtonAddToCart id={product.id} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mb-8">
            <Link href={`/Products`} className="text-base sm:text-lg md:text-xl bg-blue-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-800 transition font-semibold">
              Show More
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}