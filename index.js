const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
// mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error(`Could not connect to MongoDB - ${err}`))
const app = express()
dotenv.config();

const port = process.env.PORT ||3000;

mongoose.connect("mongodb+srv://Prabhakar2003:Prabha123@cluster0.s9y3hpe.mongodb.net/registrationFormDB",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
    }
)
const registrationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const Registration=mongoose.model("Registration",registrationSchema)
app.use(bodyParser.urlencoded ({extended:true}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/pages/index.html")
})

app.post("/register",async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const existingUser= await Registration.findOne({email:email});
            if(!existingUser){
                const newRegistration=new Registration({
                    name,
                    email,
                    password
                });
                await newRegistration.save();
                res.redirect("/success");
            }
            else{
                alert("user already exist");
                res.redirect("/error");
            }

        

        const newRegistration=new Registration({
            name,
            email,
            password
        })
         await newRegistration.save()
         res.redirect("/success");
    
    }catch(error){
        console.log(error);
        res.redirect("error");
    }

})
app.get("/success",(req,res)=>{
    res.sendFile(__dirname +"/pages/success.html")
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname +"/pages/error.html")
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

