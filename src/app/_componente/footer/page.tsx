
"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-12">
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8">
            {/* Column 1 */}
            <div>
              <h3 className="font-bold mb-3 text-sm sm:text-base text-white">Electronics</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition">Mobile Phones</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Tablets</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Computers</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Home Appliances</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Cameras</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold mb-3 text-sm sm:text-base text-white">Fashion</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition">Women's Fashion</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Men's Fashion</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Girls' Fashion</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Boys' Fashion</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Sunglasses</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold mb-3 text-sm sm:text-base text-white">Home & Kitchen</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition">Kitchen Tools</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Bath Items</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Home Decor</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Small Appliances</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Organization</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-bold mb-3 text-sm sm:text-base text-white">Beauty</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition">Women's Perfume</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Men's Perfume</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Skincare</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Hair Care</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Accessories</Link></li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h3 className="font-bold mb-3 text-sm sm:text-base text-white">Kids & Baby</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition">Strollers</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Car Seats</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Kids Clothes</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Toys</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Baby Feeding</Link></li>
              </ul>
            </div>

            {/* Column 6 */}
            <div>
              <h3 className="font-bold mb-3 text-sm sm:text-base text-white">Top Brands</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition">Apple</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Samsung</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Nike</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Ray Ban</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Chicco</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                © 2024 Smart Tech Store. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs sm:text-sm">
                <Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link>
                <span className="text-gray-600">|</span>
                <Link href="#" className="hover:text-blue-400 transition">Terms & Conditions</Link>
                <span className="text-gray-600">|</span>
                <Link href="#" className="hover:text-blue-400 transition">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
