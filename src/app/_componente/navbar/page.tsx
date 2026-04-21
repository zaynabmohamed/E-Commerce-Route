"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { useSession , signOut } from 'next-auth/react'
import { useContext, useState } from "react";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { BiMenu, BiX } from "react-icons/bi";
import { CartContext} from "@/context/CartContext";
import { WishlistContext} from "@/context/WishlistContext";

export default function Navbar() {
  const {data:  session } =  useSession()
  const {numberCart , setNumberCart} = useContext(CartContext)
  const {numberWishlist , setNumberWishlist} = useContext(WishlistContext)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  function LogOut(){
   signOut({callbackUrl : "/Login"})
  }
  const path = usePathname()
  
  return (    
    <>
      <nav className="bg-white shadow-md px-3 sm:px-6 py-3 sm:py-4 flex justify-between sm:justify-around items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-extrabold text-black min-w-fit">
          <Link href={session ? "/" : "/Login"}>
            {session ? "Tech" : "Smart Tech"}
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-4 lg:gap-6 text-gray-700 font-medium">
          <li><Link href="/Products" className={path === '/Products'? "text-red-500 font-bold" : "hover:text-red-500 transition"}>Products</Link></li>
          <li><Link href="/Brands" className={path === '/Brands'? "text-red-500 font-bold" : "hover:text-red-500 transition"}>Brands</Link></li>
          <li><Link href="/Categories" className={path === '/Categories'? "text-red-500 font-bold" : "hover:text-red-500 transition"}>Categories</Link></li>
        </ul>

        {/* Icons and Auth */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Auth Links - Hidden on mobile */}
          {!session ? (
            <div className="hidden sm:flex gap-3 text-gray-700 font-medium text-sm">
              <Link href='/Register' className={path === '/Register'? "text-red-500 font-bold" : "hover:text-red-500 transition"}>Register</Link>
              <span className="text-gray-300">|</span>
              <Link href='/Login' className={path === '/Login'? "text-red-500 font-bold" : "hover:text-red-500 transition"}>Login</Link>
            </div>
          ) : (
            <span className="hidden sm:block cursor-pointer text-gray-700 hover:text-red-500 transition font-medium text-sm" onClick={LogOut}>SignOut</span>
          )}

          {/* Cart and Wishlist */}
          <Link className="relative text-lg sm:text-xl text-gray-700 hover:text-red-500 transition" href="/Cart">
            {numberCart > 0 && <span className='absolute top-[-8px] end-[-8px] flex size-5 bg-red-500 text-white rounded-full justify-center items-center text-xs font-bold'>{numberCart}</span>}
            <FaShoppingCart />
          </Link>
          
          <Link href="/Wishlist" className="relative text-lg sm:text-xl text-gray-700 hover:text-red-500 transition">
            {numberWishlist > 0 ? (
              <RiHeart3Fill className="text-red-500 w-6 h-6 sm:w-5 sm:h-5" />
            ) : (
              <RiHeart3Line className='w-6 h-6 sm:w-5 sm:h-5' />
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-gray-700 hover:text-red-500 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3 border-t">
          <Link href="/Products" className={`block py-2 px-3 rounded ${path === '/Products'? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link href="/Brands" className={`block py-2 px-3 rounded ${path === '/Brands'? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => setMobileMenuOpen(false)}>Brands</Link>
          <Link href="/Categories" className={`block py-2 px-3 rounded ${path === '/Categories'? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => setMobileMenuOpen(false)}>Categories</Link>
          
          <hr className="my-2" />
          
          {!session ? (
            <div className="space-y-2">
              <Link href='/Register' className={`block py-2 px-3 rounded ${path === '/Register'? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => setMobileMenuOpen(false)}>Register</Link>
              <Link href='/Login' className={`block py-2 px-3 rounded ${path === '/Login'? "bg-red-500 text-white" : "text-gray-700 hover:bg-gray-100"}`} onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </div>
          ) : (
            <button className="w-full text-left py-2 px-3 rounded text-gray-700 hover:bg-gray-100" onClick={() => {LogOut(); setMobileMenuOpen(false)}}>SignOut</button>
          )}
        </div>
      )}
    </>
  );
}