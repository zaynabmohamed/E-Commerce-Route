"use client";
import { MdDeleteForever } from "react-icons/md"
import { Button } from "@/components/ui/button";
import ButtonAddToCart from "@/FileClientComponent/ButtonAddToCart";
import { GetUserWishlist } from "@/WishlistAction/GetUserWishlist";
import Image from "next/image";
import {  useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { DeleteWishlist } from "@/WishlistAction/DeleteWishlist";
import { Daum } from "@/Types/Wishlist.Type";
import { WishlistContext } from "@/context/WishlistContext";
/*/////////////////////////////////////////////////////////////////*/

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isremove, setIsRemove] = useState(false);  
  const {numberWishlist , setNumberWishlist } = useContext(WishlistContext)
  {/* get Data from Page products  */}
  async function getUser(){
    try{
     const res = await GetUserWishlist();
     console.log(res.data)
     if(res.status === 'success'){
      console.log(res)
       setIsLoading(true)
       setProducts(res.data)
      setIsLoading(false)
     }
    }catch(err){
        console.log(err)
    }
  }
    useEffect(() => {
    getUser();
  }, [])

  if (isLoading) {
    return (
      <h1 className="text-center text-3xl text-black font-bold my-12">
        Loading ...
      </h1>
    );
  }
  {/* Remove Data from Page Wishlist  */}
  async function remove (id:string) { 
    setIsLoading(false)
        getUser()
      const res = await DeleteWishlist(id)
       setIsLoading(false)
     if (res.status === "success") {
       setIsLoading(false)
        console.log(res.data)
       setProducts(res.data);
        setIsLoading(false)
        getUser()
       toast.success(" Delete this product now", {
          position: "top-center",
         duration: 3000,
       });
        getUser()
         setNumberWishlist(numberWishlist )
     } else {
       toast.error("can`t Delete this product now", {
         position: "top-center",
         duration: 3000,
       });
     }
     getUser()
  setNumberWishlist(numberWishlist - 1)
    }
   
  return (
    <>
      {products?.length > 0 ? (
        <div className="w-full px-3 sm:px-4 py-6 sm:py-8">
          <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-red-600 font-bold mb-8">
              My Wishlist
            </h1>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mb-6">
              {products?.map((data:Daum) => (
                <div
                  key={data._id}
                  className="bg-white rounded-lg shadow p-4 border"
                >
                  <div className="flex gap-4 mb-4">
                    <Image
                      width={300}
                      height={300}
                      src={data.imageCover}
                      className="w-20 h-20 object-contain rounded"
                      alt={data.title}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {data.title}
                      </p>
                      <p className="text-red-600 font-bold text-lg mt-1">
                        {data.price} EGP
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        Qty: {data.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                      <ButtonAddToCart id={data.id}/>
                    </Button>
                    <Button 
                      disabled={isremove} 
                      onClick={()=>remove(data.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-lg"
                    >
                      <MdDeleteForever/>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Image</th>
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Quantity</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((data:Daum) => (
                    <tr key={data._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <Image
                          width={500}
                          height={500}
                          src={data.imageCover}
                          className="w-16 h-16 object-contain"
                          alt={data.title}
                        />
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900">
                        {data.title}
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        {data.quantity}
                      </td>
                      <td className="px-4 py-4 font-semibold text-red-600">
                        {data.price} EGP
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1">
                            <ButtonAddToCart id={data.id}/>
                          </Button>
                          <Button 
                            disabled={isremove} 
                            onClick={()=>remove(data.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-lg"
                          >
                            <MdDeleteForever/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl text-red-500 font-bold mb-4">
              Your Wishlist is Empty!
            </h1>
            <Link href='/Products' className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
