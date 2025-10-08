import moment, { Moment } from "moment-timezone"

export const getCurrentDateAndTime =():Moment=>{
    return moment().utc()
}