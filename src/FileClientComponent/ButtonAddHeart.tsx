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
            toast.success("Add Product To Wishlist 👌" ,{ position:"top-center",  duration: 3000})
            setNumberWishlist(numberWishlist + 1)
           }else{
            toast.error("can`t Add this Heart for now  !" ,{ position:"top-center" ,  duration: 3000})
           }
        }
       return (
        <>
      <div onClick={()=>Add(id)} className='cursor-pointer w-full'><RiPokerHeartsLine/> </div>
      </>
       )
     }
     