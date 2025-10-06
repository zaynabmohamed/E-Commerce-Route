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
             <div className="container mx-auto w-2/3 mt-12">
                <h2 className="text-red-800 font-bold text-3xl mb-4 p-3">My Wishlist </h2>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                     <tr>
                       <th scope="col" className="px-6 py-3">
                         Image
                       </th>
                       <th scope="col" className="px-6 py-3">
                         Product
                       </th>
                       <th scope="col" className="px-6 py-3">
                         Qty
                       </th>
                       <th scope="col" className="px-6 py-3">
                         Price
                       </th>
                       <th scope="col" className="px-6 py-3">
                         Action
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     {products?.map((data:Daum) => (
                       <tr
                         key={data._id }
                         className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                       >
                         <td className="p-4">
                           <Image
                             width={500}
                             height={500}
                             src={data.imageCover}
                             className="w-16 md:w-32 max-w-full max-h-full"
                             alt="Apple Watch"
                           />
                         </td>
                         <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                           {data.title}
                         </td>
                         <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                           {data.quantity} 
                         </td>
                         <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                           {data.price} EGP
                         </td>
                         <td className="px-6 py-4 my-16 flex justify-around items-center">
                         <Button> <ButtonAddToCart id={data.id}/> </Button>
                         <Button disabled={isremove} onClick={()=>remove(data.id)} className="text-2xl cursor-pointer"><MdDeleteForever/></Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           ) : (
             <h1 className="text-center text-3xl text-red-500 font-bold my-12" >
              Empty My Wishlist ... <Link href='/Products'>Go to the page Products</Link>
             </h1>
           )}
    </>
)
}
