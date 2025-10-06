'use server'
import getMyToken from "@/Uitilites/getMyToken"
 export default async function getCart(){
    const token = await getMyToken()
    if(!token){
        throw new Error ('please login to be able see cart')
    }
   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart` , {
        method:"GET",
        headers:{
            token,
            "Content-Type" : "application/json"
        }
    })
    const payload = await res.json()
    return payload;

  }
