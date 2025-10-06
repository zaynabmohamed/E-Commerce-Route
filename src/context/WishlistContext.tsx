'use client'
import { ReactNode, Dispatch, SetStateAction , createContext, useState , useEffect } from "react"
import { GetUserWishlist } from "@/WishlistAction/GetUserWishlist"

  export const WishlistContext = createContext<WishlistContextType | undefined>(undefined)
export type WishlistContextType = {
  numberCart: number;
  setNumberCart: Dispatch<SetStateAction<number>>;
};
type WishlistContextProviderProps = {
  children: ReactNode;
};
  export default  function WishlistContextProvider({children}: WishlistContextProviderProps){
    
    const [numberWishlist , setNumberWishlist]  = useState<number>(0)
       async function GetUserHeart(){
        try{
            const res = await GetUserWishlist()
            if(res.status === "success"){
             console.log(res.count)
          let sum = 0;
        sum += res.count 
        setNumberWishlist(sum);
        console.log(sum)
      }
      }
        catch(err){
            console.log(err)
        }
       }
       useEffect(()=>{
         GetUserHeart()
       },[])

  return (
    <>
    <WishlistContext.Provider value={{numberWishlist , setNumberWishlist}}>
      {children}
    </WishlistContext.Provider>
    </>
  )
  }

 