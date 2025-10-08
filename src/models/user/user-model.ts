import mongoose from "mongoose"
import { IUser } from "../../interface/auth-interface"
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler"
import { ERole } from "../../constants/enum/auth-enum"
import { attachment_schema } from "../settings/general-schema"

const schema = new mongoose.Schema({
    name:{type:String,required:true,index:true},
    email:{type:String,required:true,unique:true,index:true},
    phone:{type:String,required:true,unique:true},
    role:{type:String,required:true,enum:[ERole.ADMIN,ERole.SUBADMIN,ERole.USER],index:true},
    avatar:{type:[attachment_schema]},
    country:{type:String,required:true},
    state:{type:String,required:true},
    zip_code:{type:String},
    updated_at:{type:Date},
    created_at:{type:Date,default:getCurrentDateAndTime()},
    disabled:{type:Boolean,default:false}
})

export const UserModel = mongoose.model<IUser & mongoose.Document>('user',schema)