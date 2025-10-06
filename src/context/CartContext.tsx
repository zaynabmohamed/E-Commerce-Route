'use client'
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react"
import getCart from '@/CartAction/getUserCart';

export type CartContextType = {
  numberCart: number;
  setNumberCart: Dispatch<SetStateAction<number>>;
};
export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberCart, setNumberCart] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getCart();
      if (res.status === "success") {
         console.log(res)
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setNumberCart(sum);
      }
    } catch (err) {
      console.log(err)
      console.log("not login");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberCart, setNumberCart }}>
      {children}
    </CartContext.Provider>
  );
}

   


