import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

 export async function middleware(request: NextRequest){
   
  const  token= await getToken({req : request})
  console.log(token)
if(token){
      if(request.nextUrl.pathname === " /Login" || request.nextUrl.pathname === " /Register" ){
     return NextResponse.redirect(new URL ('/' , request.url))
      }else{
    return NextResponse.next()
      }
}else{
     return NextResponse.redirect(new URL ('/Login' , request.url))
}
 }
 export const config = {
  matcher: ["/Cart"  ],
}