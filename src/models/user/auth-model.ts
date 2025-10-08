import mongoose, { Schema } from "mongoose"
import { IAuth } from "../../interface/auth-interface"
import { ERole } from "../../constants/enum/auth-enum"

const schema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,required:true,unique:true,ref:'user'},
    email:{type:String,required:true,unique:true,index:true},
    phone:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:[ERole.ADMIN,ERole.SUBADMIN,ERole.USER]},
    disabled:{type:Boolean,default:false}
})

export const AuthModel = mongoose.model<IAuth & mongoose.Document>('auth',schema)