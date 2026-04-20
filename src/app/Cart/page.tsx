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
        <div className="w-full px-3 sm:px-4 py-6 sm:py-8">
          <div className="w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-950">
                Shopping Cart
              </h1>
              <Button 
                className='cursor-pointer bg-red-500 hover:bg-red-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base' 
                onClick={()=>Clear()}
              >
                Clear Cart
              </Button>
            </div>

            {/* Total Price */}
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-6 border-l-4 border-blue-600">
              <p className="text-lg sm:text-2xl font-bold text-blue-950">
                Total Price: <span className="text-red-600">{total} EGP</span>
              </p>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mb-6">
              {products.map((product:CartProduct) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow p-4 border"
                >
                  <div className="flex gap-4 mb-4">
                    <Image
                      width={300}
                      height={300}
                      src={product.product.imageCover}
                      className="w-20 h-20 object-contain rounded"
                      alt={product.product.title}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {product.product.title}
                      </p>
                      <p className="text-red-600 font-bold text-lg">
                        {product.price * product.count} EGP
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-semibold">Qty:</span>
                    <div className="flex items-center gap-2 border rounded-lg p-1">
                      <button 
                        disabled={isUpdata} 
                        onClick={()=>Updata(product.product.id , String(product.count - 1) , " - ")}
                        className="disabled:opacity-50 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold">
                        {product.product.id === currentId ? (LoadingUpdata ? "..." : product.count) : product.count}
                      </span>
                      <button 
                        disabled={isUpdata}  
                        onClick={()=>Updata(product.product.id , String(product.count + 1) , " + " )}
                        className="disabled:opacity-50 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    disabled={isremove}
                    onClick={() => remove(product.product.id)}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50 font-semibold text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto shadow-md rounded-lg mb-6">
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
                  {products.map((product:CartProduct) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <Image
                          width={500}
                          height={500}
                          src={product.product.imageCover}
                          className="w-16 h-16 object-contain"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-900">
                        {product.product.title}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 border rounded-lg p-1 w-fit">
                          <button 
                            disabled={isUpdata} 
                            onClick={()=>Updata(product.product.id , String(product.count - 1) , " - ")}
                            className="disabled:opacity-50 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-semibold">
                            {product.product.id === currentId ? (LoadingUpdata ? "..." : product.count) : product.count}
                          </span>
                          <button 
                            disabled={isUpdata}  
                            onClick={()=>Updata(product.product.id , String(product.count + 1) , " + " )}
                            className="disabled:opacity-50 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-red-600">
                        {product.price * product.count} EGP
                      </td>
                      <td className="px-4 py-4">
                        <button
                          disabled={isremove}
                          onClick={() => remove(product.product.id)}
                          className="text-red-600 hover:text-red-800 font-semibold disabled:opacity-50"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Checkout Button */}
            <Link href={`/Checkout/${cartId}`}>
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg font-semibold rounded-lg">
                {isLoading ? "Processing..." : "Checkout Now"}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl text-red-500 font-bold text-center px-4">
            No Products Added yet!
          </h1>
        </div>
      )}
    </>
  );
}
