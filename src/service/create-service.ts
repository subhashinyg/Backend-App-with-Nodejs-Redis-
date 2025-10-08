import { IAuth, IEnterprice, IUnit, IUser } from "../interface/auth-interface";
import { IEmployee } from "../interface/user-interface";
import { EmployeeModel } from "../models/enterprice/employee-model";
import { EnterpriceModel } from "../models/enterprice/enterprice-model";
import { UnitModel } from "../models/enterprice/unit-model";
import { AuthModel } from "../models/user/auth-model";
import { UserModel } from "../models/user/user-model";

export class CreateService {

    createUser = async (body: IUser): Promise<IUser> => {
        return await UserModel.create(body)
    }

    createAuthProfile = async (body: IAuth): Promise<IAuth> => {
        return await AuthModel.create(body)
    }

    createEnterprice = async (body: IEnterprice): Promise<IEnterprice> => {
        return await EnterpriceModel.create(body)
    }

    createUnit = async (body: IUnit): Promise<IUnit> => {
        return await UnitModel.create(body)
    }

    createEmployee = async (body: IEmployee): Promise<IEmployee> => {
        return await EmployeeModel.create(body)
    }

}