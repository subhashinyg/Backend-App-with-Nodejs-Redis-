import mongoose from "mongoose";

export const attachment_schema = new mongoose.Schema({
    url:{type:String,required:true},
    key:{type:String,required:true},
    name:{type:String}
})