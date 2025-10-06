
"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer>
      {/* 🧭 الروابط المقسمة إلى أعمدة */}
      <div className="px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ">
        {/* 📌 العمود 1 */}
        <div>
          <h3 className="font-bold mb-3">الإلكترونيات</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">الهواتف المتحركة</Link></li>
            <li><Link href="#">أجهزة التابلت</Link></li>
            <li><Link href="#">الكمبيوتر</Link></li>
            <li><Link href="#">الأجهزة المنزلية</Link></li>
            <li><Link href="#">الكاميرات</Link></li>
          </ul>
        </div>
        {/* 📌 العمود 2 */}
        <div>
          <h3 className="font-bold mb-3">الأزياء</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">أزياء نسائية</Link></li>
            <li><Link href="#">أزياء رجالية</Link></li>
            <li><Link href="#">أزياء البنات</Link></li>
            <li><Link href="#">أزياء الأولاد</Link></li>
            <li><Link href="#">النظارات</Link></li>
          </ul>
        </div>
        {/* 📌 العمود 3 */}
        <div>
          <h3 className="font-bold mb-3">المطبخ والأجهزة المنزلية</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">أدوات المطبخ</Link></li>
            <li><Link href="#">مستلزمات الحمام</Link></li>
            <li><Link href="#">ديكور المنزل</Link></li>
            <li><Link href="#">الأجهزة الصغيرة</Link></li>
            <li><Link href="#">تنظيم المنزل</Link></li>
          </ul>
        </div>
        {/* 📌 العمود 4 */}
        <div>
          <h3 className="font-bold mb-3">الجمال</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">العطور النسائية</Link></li>
            <li><Link href="#">عطور الرجال</Link></li>
            <li><Link href="#">العناية بالبشرة</Link></li>
            <li><Link href="#">العناية بالشعر</Link></li>
            <li><Link href="#">الإكسسوارات</Link></li>
          </ul>
        </div>
        {/* 📌 العمود 5 */}
        <div>
          <h3 className="font-bold mb-3">الأطفال والرضع</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">عربات الأطفال</Link></li>
            <li><Link href="#">مقاعد السيارات</Link></li>
            <li><Link href="#">ملابس الأطفال</Link></li>
            <li><Link href="#">الألعاب</Link></li>
            <li><Link href="#">الرضاعة</Link></li>
          </ul>
        </div>

        {/* 📌 العمود 6 */}
        <div>
          <h3 className="font-bold mb-3">أفضل الماركات</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">أبل</Link></li>
            <li><Link href="#">سامسونج</Link></li>
            <li><Link href="#">نايك</Link></li>
            <li><Link href="#">راي بان</Link></li>
            <li><Link href="#">شيكو</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
