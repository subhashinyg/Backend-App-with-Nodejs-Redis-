import mongoose, { Schema } from "mongoose"
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler"
import { IEmployee } from "../../interface/user-interface"
import { EEmployeeStatus } from "../../constants/enum/user-enum"

const previous_desgination = new mongoose.Schema({
    designation:{type:Schema.Types.ObjectId,required:true,ref:'designation'},
    start_date:{type:Date},
    end_date:{type:Date},
    is_current:{type:Boolean}
})

const schema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:'user',index:true},
    designation:{type:Schema.Types.ObjectId,required:true,ref:'designation',index:true},
    enterprice:{type:Schema.Types.ObjectId,required:true,ref:'enterprice',index:true},
    unit:{type:Schema.Types.ObjectId,ref:'unit',index:true},
    work_period_start:{type:Date,default:getCurrentDateAndTime()},
    work_period_end:{type:Date},
    previous_designation:{type:[previous_desgination],default:[]},
    status:{type:String,required:true,enum:[EEmployeeStatus.WORKING,EEmployeeStatus.RESIGNED],index:true},
    is_owner:{type:Boolean,default:false},
    updated_at:{type:Date},
    created_at:{type:Date,default:getCurrentDateAndTime()},
    created_by:{type:Schema.Types.ObjectId,ref:'user'}
})

export const EmployeeModel = mongoose.model<IEmployee & mongoose.Document>('employee',schema)