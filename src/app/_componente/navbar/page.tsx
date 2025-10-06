"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useSession , signOut } from 'next-auth/react'
import { useContext } from "react";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { CartContext} from "@/context/CartContext";
import { WishlistContext} from "@/context/WishlistContext";
export default function Navbar() {
  const {data:  session } =  useSession()
   const {numberCart , setNumberCart} = useContext(CartContext)
   const {numberWishlist , setNumberWishlist} = useContext(WishlistContext)
  function LogOut(){
   signOut({callbackUrl : "/Login"})
  }
  const path = usePathname()
  return (    
    <>
  <nav className="bg-white shadow-md px-6 py-4 flex justify-around items-center">
      {/* Logo */}
      {session ? <div className="text-2xl font-extrabold text-black"><Link href="/">Tech</Link></div> : <div className="text-2xl font-extrabold text-black"><Link href="/Login">Smart Tech</Link></div>}
      {/* Links */}
      <ul className="md:flex space-x-6 text-gray-700 font-medium justify-around">
        <li><Link href="/Products" className={path === '/Products'? "text-red-500" : ""}>Products</Link></li>
        <li className="hidden md:flex space-x-6 text-gray-700 font-medium"><Link href="/Brands" className={path === '/Brands'? "text-red-500" : ""}>Brands</Link></li>
        <li className="hidden md:flex space-x-6 text-gray-700 font-medium"><Link href="/Categories" className={path === '/Categories'? "text-red-500" : ""}>Categories</Link></li>
      </ul>
       {/* Login / Register */}
         {!session ?  <div className="flex space-x-4 text-gray-700 text-xl list-none">
       <li><Link href='/Register' className={path === '/Register'? "text-red-500" : ""}>Register</Link></li>
       <li><Link href='/Login' className={path === '/Login'? "text-red-500" : ""}>Login</Link></li>
       </div> : <span className="cursor-pointer" onClick={LogOut}>SignOut</span>}  
      {/* Icons */}
      <div className="flex space-x-4 text-gray-700 text-xl gap-4">
        <Link className="relative" href="/Cart">{numberCart > 0  && <span className='absolute top-[-10px]  end-[-10px] flex size-5 bg-black text-white rounded-[50%] justify-center items-center text-xs'>{numberCart}</span>}<FaShoppingCart /> </Link>
         <Link href="/Wishlist" className="relative">
      {numberWishlist > 0 ? (
        <RiHeart3Fill className="text-red-500 w-6 h-6" />
      ) : (
        <RiHeart3Line className='text-gray-700 w-6 h-6' />
      )}
    </Link>
       </div>
    </nav>
    </>
  );
}