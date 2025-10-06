'use client'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage }from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { CheckoutType, SchemaCheckout } from "@/Schema/Checkout.Schema";
import onlineCheckout from "@/CheckoutAction/onlineCheckout";
import { useState } from "react";

export default function Checkout() {
  const [isLoading , setIsLoading] = useState(false)
   const {id} :{id:string} = useParams()
  const form = useForm<CheckoutType>({
    defaultValues:{
       details: "" ,
        phone: "" ,
        city: "",
    },
    resolver:zodResolver(SchemaCheckout),
  })
  //{ Call Api (register) } 
 async function handleCheckout(value : CheckoutType){
  setIsLoading(true)
  console.log(value)
  const res = await onlineCheckout(id , "" , value)
  setIsLoading(false)
  if(res.status === "success"){
    console.log(res.session.url)
    window.location.href = res.session.url
  }
  }
  return (
    <>
    <div className='w-[80%] mx-auto my-12 p-4  sm:grid-cols-2  gap-6'>
    <h1 className='text-center font-bold text-3xl my-4'> checkout Now</h1>
    <Form {...form} >
 <form onSubmit={form.handleSubmit(handleCheckout)}>
    <FormField
    control={form.control}
    name="details"
    render={({field}) => (
      <FormItem>
        <FormLabel> Details:</FormLabel>
        <FormControl>
          <Input {...field}  type='text'/>
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
          <Input {...field}  type='tel'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="city"
    render={({field}) => (
      <FormItem>
        <FormLabel> City:</FormLabel>
        <FormControl>
          <Input {...field}  type='text'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
<Button className='cursor-pointer w-full mt-4'>{isLoading ? <><span className="loading"></span></> : "Pay Now"}</Button>
 </form>
</Form>
    </div>
    </>
  )
}


