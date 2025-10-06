  'use server'
import getMyToken from "@/Uitilites/getMyToken"
  export async function DeleteWishlist(id:string){
    const token = await getMyToken()
    if(!token){
        throw new Error('please first login')
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        method:"DELETE",
        headers:{
            token,
      "Content-Type" : "application/json"
        }
    })
    console.log(res)
    const payload = await res.json()
    console.log(payload);
    return payload;
  }