import { Moment } from "moment-timezone"
import { ERole } from "../constants/enum/auth-enum"

export interface IToken{
    token:string //token
}

export interface ITokenPayload {
    user_id: string, // user ID
    role: string, // user role
    auth_id: string // auth  ID
}

export interface ICreateDoc {
    updated_at?:Moment,
    created_at?:Moment,
    created_by?:string | IUser
}

export interface IAttachment {
    url:string,
    key:string,
    name:string
}

export interface IAuth {
    _id?:string,
    user?:string | IUser,
    email:string,
    password?:string,
    role:ERole,
    country_code?:string,
    phone_number?:string,
    phone:string // stored in db as phone number `${country_code} ${phone_number}`,
    disabled?:boolean
}

export interface IUser extends IAuth,ICreateDoc{
    name:string,
    avatar:IAttachment[],
    country:string,
    state:string,
    zip_code:string,
    // social_media // todo
}

export interface IUserRegistration {
    name:string,
    avatar:IAttachment[],
    country:string,
    state:string,
    zip_code:string,
    user?:string | IUser,
    email:string,
    password:string,
    role:ERole,
    country_code?:string,
    phone_number?:string,
    phone:string // stored in db as phone number `${country_code} ${phone_number}`,
    disabled?:boolean
}

export interface ICoordinates {
    type: string,
    coordinates: number[] // [longitude,latitude]
}

export interface IEnterprice extends ICreateDoc {
    _id?:string
    name:string,
    logo:IAttachment,
    overview:string,
    website?:string,
    headquaters:string,
    founded_in:Moment,
    industry:string,
    size:number
}

export interface IUnit extends ICreateDoc {
    _id?:string
    location:string,
    address:string,
    coordinates?: string | ICoordinates,
    enterprice:string | IEnterprice
}

export interface IEnterpriceRegistration{
    email:string,
    password:string,
    name:string,
    avatar:IAttachment[],
    country_code:string,
    phone_number:string,
    country:string,
    state:string,
    zip_code:string,
    enterprice_name:string,
    logo:IAttachment,
    info:string,
    location:string,
    address:string,
    coordinates: ICoordinates,
    overview:string,
    website:string,
    headquaters:string,
    founded_in:Moment,
    industry:string,
    size:number,
    latitude:number,
    longitude:number
}