 import * as z from 'zod'
 export const SchemaLogin = z.object({
    email:z.email().nonempty("the email is required"),
    password:z.string().nonempty('this field is required').min(6,'min length is 6 chars').max(14, ' max length is 14'),
 })
export type Logintype = z.infer<typeof SchemaLogin>