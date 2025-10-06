"use server"

import getMyToken from "@/Uitilites/getMyToken"

export async function ClearCart(){
      
    const token = await getMyToken();
     if (!token){
        throw new Error('login first')
     }
   const res = await  fetch(`https://ecommerce.routemisr.com/api/v1/cart` , {
        method:"DELETE" ,
        headers:{
            token,
            //   "Content_Type" : "application/json"
        }
      
     })
      const payload = await res.json()
    return payload;
  }