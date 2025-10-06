 import * as z from 'zod'
 export const Schema = z.object({
    name: z.string().nonempty("the name is required").min(2, 'min length is 2') . max(14, 'max length is 14'),
    email:z.email().nonempty("the email is required"),
    password:z.string().nonempty('this field is required').min(6,'min length is 6 chars').max(14, ' max length is 14'),
    rePassword:z.string().nonempty('the field is required'),
    phone:z.string().regex(/^01[0125][0-9]{8}$/, "the phone is not vaild")
 })
 .refine((object)=>object.password=== object.rePassword,{
    path:['rePassword'],
    error:"the password and rePassword is not match !!"
 })
export type registertype = z.infer<typeof Schema>