const express=require('express')
const app=express();
const dotenv=require('dotenv')
const {connectDb} =require( './db/server.js');
const User = require('./model/user.model.js');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config({path:'./.env'})

connectDb();

app.set('view engine','ejs');

app.get("/",(req,res)=>{    
    res.render("index", { title: "Welcome to the CRUD API" });
});

app.post("/create",async (req,res)=>{    
    let {name,email,image} = req.body;
    let createdUser=await User.create({name,email,image});
    res.redirect("/read");
    // res.send(createdUser);
});





app.get("/read",async (req,res)=>{    
    let users=await User.find();
    res.render("read",{users});
});

app.get("/delete/:id",async (req,res)=>{    
    let {id} = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/read");
});

app.get("/edit/:id",async (req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    res.render("edit", { user });
});
app.post("/update/:id",async (req,res)=>{
    let {id} = req.params;
    let {name,email,image}=req.body;
    let user = await User.findOneAndUpdate({_id: id},{name,email,image},{new:true});
    await user.save();
   res.redirect("/read");
});



app.listen(1000,()=>{    
    console.log("Server is running on port 1000");
});