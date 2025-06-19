import mongoose  from "mongoose";
import User from "./Modules.user.js";


const ChatSolution=new mongoose.Schema({
  
    question:{
        type:String,
        required:true
    },
   message: { type: String },
    user:{
        type:mongoose.Schema.Types.String,
        ref:"User",
        required:"true"
    }
},{timestamps:true})
export default mongoose.model('chatsolution',ChatSolution);