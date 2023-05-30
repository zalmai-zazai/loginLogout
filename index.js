import  Express  from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import User from "./models/User.js";
import bcrypt from "bcrypt"
import bodyParser from "body-parser";

const PORT  = 80;
const app = Express()
dotenv.config()
connectDB()

app.use(bodyParser.json())
app.get('/',(req,res)=>{
res.send('Hello World')
})

app.post('/register',async (req,res)=>{
    let user;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        
    } catch (error) {
        return res.status(400).send({message: "Bad Request"})
        
    }

    try {
        const response =  await user.save();
        return res.status(201).send({
            message:'User was successfully saved',
            response
        })

    } catch (error) {
        res.status(500).send({
            message:"Erorr  creating user",
            error
            
        })
    }

})

app.listen(PORT,console.log(`server is running on port ${PORT}`))