import { IAuth, IUser } from "../interface/auth-interface";
import { IDesignation, IEmployee } from "../interface/user-interface";
import { DesignationModel } from "../models/enterprice/designation-model";
import { EmployeeModel } from "../models/enterprice/employee-model";
import { AuthModel } from "../models/user/auth-model";
import { UserModel } from "../models/user/user-model";
import { objectSanitizer } from "../utilities/handler/validation-handler";

export class DetailService {

    authProfile = async (filter: Partial<IAuth>): Promise<IAuth | null> => {
        filter = objectSanitizer(filter)
        if (!Object.keys(filter)?.length) {
            return null
        }
        return await AuthModel.findOne(filter).populate('user')
    }

    designation = async (filter: Partial<IDesignation>): Promise<IDesignation | null> => {
        filter = objectSanitizer(filter)
        if (!Object.keys(filter)?.length) {
            return null
        }
        return await DesignationModel.findOne(filter)
    }

    userProfile = async (filter: Partial<IUser>): Promise<IUser | null> => {
        filter = objectSanitizer(filter)
        if (!Object.keys(filter)?.length) {
            return null
        }
        return await UserModel.findOne(filter)
    }

    employeeProfile = async (filter: Partial<IEmployee>): Promise<IEmployee | null> => {
        filter = objectSanitizer(filter)
        if (!Object.keys(filter)?.length) {
            return null
        }
        return await EmployeeModel.findOne(filter).populate('enterprice').populate('designation').populate('unit')
    }

}