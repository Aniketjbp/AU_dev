const express=require("express");
const app=express();
const {dbconnection}=require('./src/db/conn');
const user=require('./src/models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
app.use(express.json());
dbconnection();
const port=process.env.port || 8000;
app.get("/",(req,res)=>{
    res.send("hello welcome to coderz")
})

app.post("/register",async(req,res)=>{
    try{

        console.log(req.body);
        const {firstname,lastname,email,password}=req.body;
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Enter all the required fields");
        }
        const existinguser=await user.findOne(email);
        if(existinguser){
            return res.status(400).send("User already exist");
        }
        let hash=bcrypt.hashSync(password,10);
        const newuser=await user.create({
            firstname: firstname,
            lastname: lastname,
            email:email,
            password:hash
        });
        const token=jwt.sign({id: newuser._id,email},process.env.secret_key,{
            expiresIn : "3h"
        });
        newuser.token=token;
        newuser.password=undefined;

        res.status(200).json({
            message: "You have successfully registered",
            newuser
        });


    }
    catch(error){
        console.log(error);
    }
});

app.listen(8000,()=>{
    console.log('server is running on '+port);
})

