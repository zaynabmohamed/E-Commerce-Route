'use server'
import getMyToken from "@/Uitilites/getMyToken"
   export async function AddToWishlist(id:string){
    const token = await getMyToken();
    if(!token){
        throw new Error("first login")
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        method:"POST",
        headers:{
            token,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({productId : id})
    })
    console.log(res)
    const payload = await res.json()
    console.log(payload)
    return payload
    }