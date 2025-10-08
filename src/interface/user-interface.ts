import { Moment } from "moment-timezone"
import { ICreateDoc, IEnterprice, IUnit, IUser } from "./auth-interface"
import { EEmployeeStatus } from "../constants/enum/user-enum"

export interface IDesignation extends ICreateDoc{
    _id?:string
    name:string,
    enterprice?:string | IEnterprice,
    unit?: string | IUnit,
    public: boolean
}

export interface IEmployee extends ICreateDoc{
    _id?:string,
    user:string | IUser,
    designation: string | IDesignation,
    enterprice: string | IEnterprice,
    unit?: string | IUnit
    work_period_start: Moment,
    work_period_end?: Moment,
    previous_designation:IPreviousDesgination[],
    status:EEmployeeStatus,
    is_owner?:boolean
}

export interface IPreviousDesgination {
    _id?:string
    designation:string | IDesignation,
    start_date:Moment,
    end_date?:Moment,
    is_current:boolean
}

export interface IProfile extends IUser {
    employee?:IEmployee
}