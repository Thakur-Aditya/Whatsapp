const mongoose = require("mongoose");

const Chat = require("./models/chats.js"); 

main().then((result) => {
    console.log("connected to db");
 
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }

const allChats = [
    {
    from:"Aditya",
    to:"chetu",
    msg:"aditya to chetu",
    createdAt: new Date()
},{
    from:"ajay",
    to:"dippra",
    msg:"i love you",
    createdAt: new Date()
},{
    from:"jyaditya",
    to:"chauhan",
    msg:"coffee le aa",
    createdAt: new Date()
},{
    from:"drishty",
    to:"garima",
    msg:"bhaag yehan se",
    createdAt: new Date()
},{
    from:"anadi",
    to:"gargi",
    msg:"hello beautiful",
    createdAt: new Date()
}];

Chat.insertMany(allChats);