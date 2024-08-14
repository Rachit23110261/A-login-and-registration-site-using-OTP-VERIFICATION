const {z}= require('zod')
const validate= (schema)=> async (req,res,next)=>{
    try{
        const parseBody= await schema.parseAsync(req.body)
        req.body= parseBody
        next()
    }
    catch(error){
        const status= 422
        const extraDetails= error.errors[0].message
        const message= 'fill details correctly'
        const err={
           status,message,extraDetails

        }
        console.log(err)
        res.status(400).json({msg: message})

    }
}
module.exports= validate