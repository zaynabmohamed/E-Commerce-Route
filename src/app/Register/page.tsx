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
  //{ Call Api (registher) } 
 async function handleRegister(value : registertype){
  setIsLoading(true)
  console.log(value)
 try{
  const res =await  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , value)
  setIsLoading(false)
   if(res.data.message === "success"){
        toast.success("you register success", {position: "top-center" , duration:1000})
    router.push('/Login')
   }
  }catch(err){
    console.log(err.response.data.message)
    toast.error(err.response.data.message , {position:'top-center' , duration: 3000})
  }
  }
  return (
    <>
      <div className='w-full px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md'>
          <h1 className='text-center font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-blue-900'>
            Create Account
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4 sm:space-y-5'>
              
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-sm sm:text-base'>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}   
                        type='text'
                        placeholder='John Doe'
                        className='py-2 sm:py-3 text-sm sm:text-base'
                      />
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

              <FormField
                control={form.control}
                name="rePassword"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='text-sm sm:text-base'>Confirm Password</FormLabel>
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

              <Button 
                className='cursor-pointer w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 text-base sm:text-lg rounded-lg transition'
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register Now"} 
              </Button>

            </form>
          </Form>

          <p className='text-center text-xs sm:text-sm text-gray-600 mt-4'>
            Already have an account? 
            <a href='/Login' className='text-blue-600 hover:underline font-semibold ml-1'>
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
