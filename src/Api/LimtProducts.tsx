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
  export default  async function LimtProducts(){
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=8`,{
        cache:"no-store",
        method: "GET",
    })
    const {data} = await res.json();
    console.log(data)
   return (
    <>
        <h2 className='flex justify-center p-4 bg-blue-900 text-white mx-auto sm:w-[50%] text-2xl rounded-3xl mb-4'>Show Popular Products</h2>
         <div className="gap-2  mx-auto grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3  shadow-3xl">
           {data.map((product: ProductType) => (
          <div key={product.id}>
              <Card className="p-4 gap-3">
              <div className='hover:text-red-500'><ButtonAddToWishlist id={product.id}/></div>
            <Link href={`/productDetails/${product.id}`}>
                <CardHeader>
                  <Image
                  className='w-full h-48 object-contain rounded-t-lg'
                    width={500}
                    height={500}
                    src={product.imageCover}
                    alt=".... image Product"
                  />
                </CardHeader>
                <CardContent className="flex justify-between">
                  <p className="font-bold text-blue-800 mb-3">
                    {product.category.name}
                  </p>
                  <p className="font-bold text-red-500 mb-3 ">
                    {product.brand.name}
                  </p>
                </CardContent>
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {product.title}
                </p>
                <CardFooter className="flex justify-between">
                  <div className="flex justify-around py-4 px-2 mb-3">
                    <button className="bg-red-600 text-white text-sm px-2 py-1 rounded-2xl">
                      {product.price} EGP
                    </button>
                    </div>
                    <p className="flex items-center text-yellow-500 text-sm">
                      {product.ratingsAverage}
                      <i className="text-yellow-300 ">
                        <IoStarSharp />
                      </i>
                    </p>
                </CardFooter>
                </Link>
              </Card>
            <ButtonAddToCart id={product.id} />
          </div>
        ))}
            <Link href={`/Products`} className="text-xl hover:text-red-500 " > Show More</Link>
        </div>
          </>
   )
  }