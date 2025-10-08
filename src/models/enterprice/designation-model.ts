import mongoose, { Schema } from "mongoose";
import { IDesignation } from "../../interface/user-interface";
import { initial_designation } from "../../constants/initial-db-constant";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler";

const schema = new mongoose.Schema({
    name:{type:String,required:true},
    enterprice:{type:Schema.Types.ObjectId,ref:'enterprice'},
    unit:{type:Schema.Types.ObjectId,ref:'unit'},
    public:{type:Boolean,default:false},
    updated_at:{type:Date},
    created_at:{type:Date,default:getCurrentDateAndTime()},
    created_by:{type:Schema.Types.ObjectId,ref:'user'}
})

export const DesignationModel = mongoose.model<IDesignation & mongoose.Document>('designation',schema)

export const initDesgination = async()=>{
    let designation = await DesignationModel.findOne()
    if(!designation){
        await DesignationModel.insertMany(initial_designation)
    }
}


