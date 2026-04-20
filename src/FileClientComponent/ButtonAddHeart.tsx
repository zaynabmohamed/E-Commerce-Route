'use client'
import { toast } from 'sonner';
import { RiPokerHeartsLine } from "react-icons/ri";
import { AddToWishlist } from '@/WishlistAction/AddToWishlist';
import { useContext } from 'react';
import { WishlistContext } from '@/context/WishlistContext';

export default function ButtonAddToWishlist({id } : {id:string}) {
  const {numberWishlist , setNumberWishlist } = useContext(WishlistContext)
  
  async function Add(id:string){
    const res = await AddToWishlist(id)
    console.log(res)
    if(res.status === "success"){
      toast.success("Added to Wishlist ❤️" ,{ position:"top-center",  duration: 3000})
      setNumberWishlist(numberWishlist + 1)
    }else{
      toast.error("Cannot add to wishlist right now!" ,{ position:"top-center" ,  duration: 3000})
    }
  }
  
  return (
    <button 
      onClick={()=>Add(id)} 
      className='cursor-pointer w-full text-red-500 hover:text-red-600 transition text-2xl sm:text-3xl p-1 flex justify-center'
    >
      <RiPokerHeartsLine/> 
    </button>
  )
}