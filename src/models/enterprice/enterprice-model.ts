import mongoose, { Schema } from "mongoose"
import { IAuth, IEnterprice } from "../../interface/auth-interface"
import { attachment_schema } from "../settings/general-schema"
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler"

const schema = new mongoose.Schema({
    name:{type:String,required:true,index:true},
    logo:{type:attachment_schema},
    overview:{type:String,required:true},
    website:{type:String},
    headquaters:{type:String,required:true},
    founded_in:{type:Date,required:true},
    industry:{type:String,required:true},
    size:{type:Number},
    updated_at:{type:Date},
    created_at:{type:Date,default:getCurrentDateAndTime()},
    created_by:{type:Schema.Types.ObjectId,ref:'user'}
})

export const EnterpriceModel = mongoose.model<IEnterprice & mongoose.Document>('enterprice',schema)