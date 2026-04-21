'use client'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage }from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/navigation';
import { Logintype, SchemaLogin } from '@/Schema/Login.Schema';
import { signIn } from 'next-auth/react';
import { toast } from "sonner";
import { useState } from "react";
export default function Login() {
  const [isLoading , setIsLoading]  = useState(false)
// const router = useRouter()
  const form = useForm<Logintype>({
    defaultValues:{
      email:"",
      password:"",
    },
    resolver:zodResolver(SchemaLogin)
  })
  //{ Call Api (register) } 
 async function handleLogin(value :Logintype){
  setIsLoading(true)
  console.log(value)
 const response = await  signIn("credentials",{
          email: value.email,
          password:value.password,
          redirect: false , 
          callbackUrl: "/",
  } )
setIsLoading(false)
  if(response?.ok){
    toast.success('the email and password is success ❤️' , {position:"top-center" , duration:3000});
    // router.push('/')
    window.location.href = "/"
  }else{
    toast.error('Incorrect email or password try again', {position:"top-center" , duration:3000})
  }
}
  return (
    <>
      <div className='w-full px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md'>
          <h1 className='text-center font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-blue-900'>
            Welcome Back
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-4 sm:space-y-6'>
              
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-sm sm:text-base'>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}  
                        type='email'
                        placeholder='your@email.com'
                        className='py-2 sm:py-3 text-sm sm:text-base'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-sm sm:text-base'>Password</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}  
                        type='password'
                        placeholder='••••••••'
                        className='py-2 sm:py-3 text-sm sm:text-base'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                className='cursor-pointer w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 text-base sm:text-lg rounded-lg transition'
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login Now"}
              </Button>

            </form>
          </Form>

          <p className='text-center text-xs sm:text-sm text-gray-600 mt-4'>
            Don't have an account? 
            <a href='/Register' className='text-blue-600 hover:underline font-semibold ml-1'>
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

