     'use client'
import { AddToCart } from '@/CartAction/AddToCartAction';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';
import { useContext , useState } from 'react';
import { toast } from 'sonner';

export default function ButtonAddToCart({id } : {id:string}) {
  const [ isLoading , setIsloading] = useState(false)
  const {numberCart , setNumberCart} = useContext(CartContext)
  
  async function checkAdd(id:string){
    setIsloading(true)
    const res = await AddToCart(id)
    setIsloading(false)
    if(res.status === "success"){
      toast.success("Product Added to Cart ✓" ,{ position:"top-center",  duration: 3000})
      setNumberCart(numberCart + 1)
    }else{
      toast.error("Cannot add this product right now!" ,{ position:"top-center" ,  duration: 3000})
    }
  }
  
  return (
    <Button 
      onClick={()=>checkAdd(id)} 
      className='cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 text-sm sm:text-base rounded-lg transition'
    >
      {isLoading ? "Adding..." : "Add To Cart"}
    </Button>
  )
}