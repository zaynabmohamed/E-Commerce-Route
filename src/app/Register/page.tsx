'use client'
import  { useState } from 'react'
import { toast } from "sonner"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage }from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registertype, Schema } from '@/Schema/Register.Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios  from 'axios';
import { useRouter } from 'next/navigation'

export default function Register() {
  const [isLoading , setIsLoading] =  useState(false)
const router = useRouter()
  const form = useForm<registertype>({
    defaultValues:{
      name: "", 
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    resolver:zodResolver(Schema)
  })
  //{ Call Api (register) } 
 async function handleRegister(value : registertype){
  setIsLoading(true)
  console.log(value)
 try{
  const res =await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , value)
  setIsLoading(false)
   if(res.data.message === "success"){
        toast.success("you register success", {position: "top-center" , duration:10000})
    router.push('/Login')
   }
  }catch(err){
    console.log(err.response.data.message)
    toast.error(err.response.data.message , {position:'top-center' , duration: 3000})
  }
  }
  return (
    <>
    <div className='w-1/3 mx-auto my-12 '>
    <h1 className='text-center font-bold text-3xl my-4'>Registe Now </h1>
    <Form {...form}>
 <form onSubmit={form.handleSubmit(handleRegister)}>
   <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel> Name:</FormLabel>
        <FormControl>
          <Input {...field}   type='text'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
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
    <FormField
    control={form.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel>rePassword:</FormLabel>
        <FormControl>
          <Input {...field}  type='password'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
    <FormField 
    control={form.control}
    name="phone"
    render={({field}) => (
      <FormItem>
        <FormLabel> phone:</FormLabel>
        <FormControl>
          <Input {...field} type='tel'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
<Button className='cursor-pointer w-full mt-4'>{isLoading ? <span className='loading'></span> : "Register Now "} </Button>
 </form>
</Form>
    </div>
    </>
  )
}
