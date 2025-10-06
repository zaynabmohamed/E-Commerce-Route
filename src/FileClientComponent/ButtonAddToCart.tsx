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
             const res = await  AddToCart(id)
              setIsloading(false)
           if(res.status === "success"){
            toast.success("Product Add To Cart 👌" ,{ position:"top-center",  duration: 3000})
            setNumberCart(numberCart + 1)
           }else{
            toast.error("can`t Add this product for now  !" ,{ position:"top-center" ,  duration: 3000})
           }
        }
       return (
        <>
      <Button  onClick={()=>checkAdd(id)} className='cursor-pointer w-full'> {isLoading ? <span className='loading'></span>:" Add To Cart"}</Button>
      </>
       )
     }
     