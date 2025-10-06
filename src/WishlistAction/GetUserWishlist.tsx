import getMyToken from "@/Uitilites/getMyToken";

  export async function GetUserWishlist(){
   try{
    const token = await getMyToken();
    if(!token){
        throw new Error('please login first')
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        method:'GET',
        headers:{
            token ,
            'Content-Type' : "application/json"
        },
    })
    const data = await res.json()
    console.log(data)
     return data;
}catch(err){
    console.log(err)

}

  }