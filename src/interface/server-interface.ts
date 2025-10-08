import { Request, Response } from "express";
import { ITokenPayload, IUser } from "./auth-interface";

export interface ExpressResponse extends Response {}

export interface ExpressRequest extends Request {
    payload?: ITokenPayload,
    user?:IUser
}

export interface IErrorCode {
    message:string,
    code:string
}

export interface IServerError{
    status: number,
    message: string,
    error_message_code:string,
    error?: any
}