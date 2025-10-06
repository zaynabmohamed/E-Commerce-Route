import Image from "next/image";
import { Daum } from '@/Types/Brand.Type';
import Link from "next/link";
  export default  async function LimtBrands(){
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?limit=7`,{
        cache:"no-store",
        method: "GET",
    })
    const {data} = await res.json();
    console.log(data)
   return (
    <>
        <h2 className='text-3xl text-black p-4'>Show Popular Brands</h2>
         <div className="gap-2  mx-auto grid grid-cols-2 lg:grid-cols-7 sm:grid-cols-3  shadow-3xl">
            {data.map((product :Daum) => (
              <div key={product._id}>
                  <div className="p-4 gap-3 ">
                      <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={product.name}
                      />
                      <div className='flex justify-center p-2 bg-black text-white '>
                      {product.name}
                      </div>
                  </div>
              </div>
              
            ))}
        </div>
        <Link href={`/Brands`} className="text-xl hover:text-red-500 " > Show More</Link>
          </>
   )
  }