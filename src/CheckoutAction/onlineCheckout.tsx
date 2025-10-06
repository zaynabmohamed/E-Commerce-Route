"use server"

import { CheckoutType } from "@/Schema/Checkout.Schema";
import getMyToken from "@/Uitilites/getMyToken"


export default async function onlineCheckout(cartId:string , url= process.env.NEXT_URL , formValues:CheckoutType){

      const token =await  getMyToken();
      if(!token){
        throw new Error("Login First")
      }
     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` ,{
        method: "POST",
        headers:{
            token,
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({shippingAddress: formValues})
     })
     const payload = await res.json()
     console.log(payload)
     return payload;
     console.log(res)

}