import mongoose, { Schema } from "mongoose"
import { IUnit } from "../../interface/auth-interface"
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler"
import { ECordinate } from "../../constants/enum/settings-enum"

const schema = new mongoose.Schema({
    location: { type: String, required: true },
    address: { type: String },
    enterprice: { type: Schema.Types.ObjectId, required: true,ref:'enterprice',index:true },
    coordinates: {
        type: {
            type: String,
            enum: [ECordinate.POINT],
        },
        coordinates: {
            type: [Number]
        }
    },
    updated_at: { type: Date },
    created_at: { type: Date, default: getCurrentDateAndTime() },
    created_by: { type: Schema.Types.ObjectId, ref: 'user' }
})
schema.index({ coordinates: '2dsphere' });
export const UnitModel = mongoose.model<IUnit & mongoose.Document>('unit', schema)