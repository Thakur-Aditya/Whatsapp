const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js"); 
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views") );
app.set("view engine" , "ejs")

main().then((result) => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// const chat1 = new Chat ({
//     from:"Aditya",
//     to:"chetu",
//     msg:"aditya to chetu",
//     createdAt: new Date()
// });

// chat1.save().then((res) => {
//     console.log(res);
// });

app.get("/" , (req,res) => {
    res.send("working");
    // res.render("showChats.ejs" , );
});

app.get("/chats" , async (req,res) => {
    let allChats = await Chat.find();
    // console.log(allChats);
    res.render("showChats.ejs" , {allChats});
    // res.send("working");
});

app.put("/chats/:id/edit" ,(req,res) => {
    let id = req.params;
    console.log(id);
    let {msg} = req.body;
    Chat.findByIdAndUpdate(id.id, {msg:msg})
    .then((res) => {
        console.log("updated");
    }).catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});


app.delete("/chats/:id" ,async (req,res) => {
    let {id} = req.params;
    // console.log(id);
    Chat.findByIdAndDelete(id).then((res) => {
        console.log(res);
    });

    res.redirect("/chats");
});

app.get("/chats/:id/edit" ,async (req,res) => {
    let id = req.params.id;
    let oldChat = await Chat.findById(id);
    console.log(oldChat._id);
    res.render("editForm.ejs" , {oldChat});
    
    
});

app.post("/chats" , async (req,res) => {
    // res.send(" post req working");
    // console.log(req.body);
    // const chat1 = new Chat ({
    //     from:"Aditya",
    //     to:"chetu",
    //     msg:"aditya to chetu",
    //     createdAt: new Date()
    // });
    let {from,to,msg} = req.body;
    const newChat = new Chat ({
        from:from,
        to:to,
        msg:msg,
        createdAt: new Date()
    });
    // console.log(newChat);
    newChat.save()
    .then((res) => {
        console.log("database updated successfully");
    });

    res.redirect("http://localhost:3000/chats");
});


app.get("/chats/new" , async (req,res) => {
    // res.send("working");
    res.render("newChat.ejs");
    // let allChats = await Chat.find();
    // console.log(allChats);
    // res.render("showChats.ejs" , {allChats});
    // res.send("working");
});


app.listen(3000,() => {
    console.log("listening");
});