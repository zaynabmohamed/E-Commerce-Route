"use server"

export default async  function getRelated(_id:string ) {

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${_id}`)
    console.log(res)

    const payload =await res.json();
        return payload;
    
    
}