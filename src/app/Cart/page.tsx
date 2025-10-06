"use client";
import { ClearCart } from "@/CartAction/ClearCart";
import DeleteCart from "@/CartAction/DeleteCart";
import  getCart   from "@/CartAction/getUserCart";
import UpdataCart from "@/CartAction/UpdataCart";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { CartProduct } from "@/Types/Cart.Type";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isremove, setIsRemove] = useState(false);
   const [isUpdata ,  setIsUpdata ] = useState(false)
   const [LoadingUpdata ,  setLoadingUpdata ] = useState(false)
   const [currentId ,  setCurrentId ] = useState('')
   const [cartId ,  setCartId ] = useState('')
   const {numberCart , setNumberCart} = useContext(CartContext)
   const [total , setTotal]  = useState(0);
  // {fun Add Products in cart }
  async function getUser() {
            setIsLoading(true);
    try {
      const res = await getCart();
        setIsLoading(false);
      if (res.status === "success") { 
        console.log(res.cartId)
        setCartId(res.cartId)
        setTotal(res.data.totalCartPrice)
        setProducts(res.data.products);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false);
       toast.error("can`t Delete this product now", {
        position: "top-center",
        duration: 3000,
      });
    }
  }
  useEffect(() => {
    getUser();
  }, []);
   
  if (isLoading) {
    return (
      <h1 className="text-center text-3xl text-black font-bold my-12">
        Loading ... 
      </h1>
    );
  }
  // { fun  Delete Products in cart }
 async function remove(id: string) { 
     setIsLoading(false);
    setIsRemove(false);
    setIsUpdata(false);
    const res = await DeleteCart(id);
    //  setIsLoading(true);
    if (res.status === "success") {
           setIsLoading(false);
       setIsRemove(false);
       getUser()
      setProducts(res.data.products);
       getUser()
       setIsLoading(false);
       setIsUpdata(false);
      let sum = 0 ;
      res.data.products.forEach((product : CartProduct)=>{
      sum += product.count
      })
      setNumberCart(sum)
    } else {
      toast.error("can`t Delete this product now", {
        position: "top-center",
        duration: 3000,
      });
      setIsRemove(false);
      setIsUpdata(false);
    }
  }
  // { fun updata in cart }
  async function Updata(id: string, count: string , sign :string) {
     setIsLoading(false);
    setCurrentId(id)
    setLoadingUpdata(true)
    setIsUpdata(false)
    setIsRemove(false)
    const res = await UpdataCart(id , count)
    if(res.status === "success"){
       setIsLoading(true);
      if(sign === " + "){
        setNumberCart(numberCart + 1)
      }else if(sign === " - "){
        setNumberCart(numberCart - 1)
      }
     setIsRemove(false)
      getUser()
      setProducts(res.data.products)
    setIsUpdata(false)
    setLoadingUpdata(false)
     setIsLoading(false);
    }else{
     toast.error("can`t Delete this product now", {
        position: "top-center",
        duration: 3000,
      });
        setIsUpdata(false)
        setIsRemove(false)
        setLoadingUpdata(false)
    }
  }
  // { fun clear Products in cart }
  async function Clear(){
    const res = await ClearCart()
   if(res.message === "success"){
     setNumberCart(!numberCart)
     getUser();
   }
  }
  return (
    <>
      {products?.length > 0 ? (
        <div className="container mx-auto w-[80%] mt-12">
          <div className=' flex justify-end'>
        <Button className='cursor-pointer my-4 bg-red-500 hover:bg-red-700' onClick={()=>Clear()}>Clean Cart</Button> 
          </div>
          <h2 className="relative text-3xl font-bold text-blue-950 p-2 ">Total Price : {total}</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
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
                {products.map((product:CartProduct) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        width={500}
                        height={500}
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-2 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button disabled={isUpdata} onClick={()=>Updata(product.product.id , String(product.count - 1) , " - ")}
                          className="disabled:bg-slate-300  inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          {product.product.id === currentId ?(LoadingUpdata ? <div className="load"></div> : <span>{product.count}</span>) :  <span>{product.count}</span>}
                        </div>
                        <button disabled={isUpdata}  onClick={()=>Updata(product.product.id , String(product.count + 1) , " + " )}
                          className="disabled:bg-slate-600 inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <button
                        disabled={isremove}
                        onClick={() => remove(product.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 cursor-pointer disabled:bg-slate-900 disabled:p-2 disabled:rounded-2xl disabled:text-white"
                      >
                        Remove
                      </button>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         <Link href={`/Checkout/${cartId}`}> <Button className="bg-blue-700 w-full text-2xl p-6 text-white cursor-pointer my-4">{isLoading ? <><span className="loading"></span></> : " Checkout Now"}</Button></Link>
        </div>
      ) : (
        <h1 className="text-center text-3xl text-red-500 font-bold my-12">
          {" "}
          No Products Added yet!{" "}
        </h1>
      )}
    </>
  );
}
