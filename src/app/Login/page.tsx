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
    <div className='w-1/3 mx-auto my-12 '>
    <h1 className='text-center font-bold text-3xl my-4'>Login Now </h1>
    <Form {...form}>
 <form onSubmit={form.handleSubmit(handleLogin)}>
    <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel> Email:</FormLabel>
        <FormControl>
          <Input {...field}  type='email'/>
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
        <FormLabel> Password:</FormLabel>
        <FormControl>
          <Input {...field}  type='password'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
<Button className='cursor-pointer w-full mt-4'>{isLoading ? <span className='loading'></span>: " Login Now"}</Button>
 </form>
</Form>
    </div>
    </>
  )
}

