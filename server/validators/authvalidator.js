const {z}= require('zod')
const signupSchema= z.object({
    username:z.string({
        required_error:"name is required"
    }).trim().min(3,{message: "name must be atleast 3 characters long"}).max(255, {message: "name must be not more than 255 char long"}),
    email: z.string().email({ message: "Invalid email format" }).nonempty(),
    phone: z.string().regex(/^\d{10}$/, { message: "Invalid phone number format" }).nonempty(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).nonempty(),
    isAdmin: z.boolean().default(false),
})
module.exports= signupSchema