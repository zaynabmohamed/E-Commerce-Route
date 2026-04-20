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
      <div className='w-full px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md'>
          <h1 className='text-center font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-blue-900'>
            Shipping Details
          </h1>
          
          <Form {...form} >
            <form onSubmit={form.handleSubmit(handleCheckout)} className='space-y-4 sm:space-y-6'>
              
              <FormField
                control={form.control}
                name="details"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-sm sm:text-base'>Address Details</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}  
                        type='text'
                        placeholder='Street address, apartment, etc.'
                        className='py-2 sm:py-3 text-sm sm:text-base'
                      />
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
                    <FormLabel className='text-sm sm:text-base'>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}  
                        type='tel'
                        placeholder='+1 (555) 123-4567'
                        className='py-2 sm:py-3 text-sm sm:text-base'
                      />
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
                    <FormLabel className='text-sm sm:text-base'>City</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}  
                        type='text'
                        placeholder='Your city'
                        className='py-2 sm:py-3 text-sm sm:text-base'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                className='cursor-pointer w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 sm:py-3 text-base sm:text-lg rounded-lg transition'
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </Button>

            </form>
          </Form>
        </div>
      </div>
    </>
  )
}


