 import * as z from 'zod'
 export const SchemaCheckout = z.object({
    details: z.string().nonempty("this field can`t be empty"),
    phone: z.string().nonempty("phone can`t be empty").regex(/^01[0125][0-9]{8}$/, "the phone is not vaild"),
    city: z.string().nonempty("this field can`t be empty"),
 })
export type CheckoutType = z.infer<typeof SchemaCheckout>