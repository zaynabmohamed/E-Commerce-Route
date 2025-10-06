import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const AuthOptions :NextAuthOptions ={
   pages:{
    signIn:"/Login"
   },
    providers:[
        Credentials({
            name: "Credentials",
            credentials:{
                email:{},
                password:{}
            },
            authorize:async (credentials)=>{
              const response = await  fetch(`${process.env.API}/auth/signin`,{
                method:"POST" ,
                body:JSON.stringify({
                    email:credentials?.email,
                    password:credentials?.password,
                }),
                headers:{"Content-Type" : 'application/json'},
              });
              const payload = await response.json();
              console.log(payload)
              if(payload.message === 'success'){
                const decodedToken :{id:string}= jwtDecode(payload.token)
               
                return {
                    id:decodedToken.id,
                    user: payload.user,
                    token:payload.token,
                }
              }else{
                throw new Error(payload.message || " wrong")
              }
            } ,
        })
    ],
    callbacks:{
        // server
         async jwt({ token, user }) {
            if(user){
            token.user = user?.user;
            token.token = user?.token;
            }
      return token; 
    },
    // server , client
      async session({ session, token }) {
        session.user = token.user;
      return session
    },
    }

}
// return null في حاله وجود مشكلة ان ال login is faild
// return payload.user لما يحصل login بنجاح 
// return (throw new Error(message خاصة بيه = payload .error))