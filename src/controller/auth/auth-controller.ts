import moment from "moment-timezone";
import { EDesgination, ERole } from "../../constants/enum/auth-enum";
import { ECordinate } from "../../constants/enum/settings-enum";
import { EEmployeeStatus } from "../../constants/enum/user-enum";
import { error_message } from "../../constants/error-constants";
import { IAuth, IEnterprice, IEnterpriceRegistration, IToken, IUnit, IUser } from "../../interface/auth-interface";
import { ExpressRequest, ExpressResponse } from "../../interface/server-interface";
import { IEmployee } from "../../interface/user-interface";
import { CreateService } from "../../service/create-service";
import { DetailService } from "../../service/detail-services";
import { BcryptHandler } from "../../utilities/handler/bcrypt-handler";
import { ControllerHandler } from "../../utilities/handler/controller-handler";
import { getCurrentDateAndTime } from "../../utilities/handler/date-time-handler";
import { JwtHandler } from "../../utilities/handler/jwt-handler";
import { bodyRequiredValidator, validatePassword } from "../../utilities/handler/validation-handler";

export class AuthController extends ControllerHandler {

    private bcrypt_handler = new BcryptHandler()
    private detail_service = new DetailService()
    private create_service = new CreateService()
    private jwt_handler = new JwtHandler()

    login = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const body: IAuth = request.body
            const required = ['email', 'password']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }

            body.email = body.email.toLowerCase()
            let auth_profile = await this.detail_service.authProfile({ email: body?.email })
            if (!auth_profile) {
                return this.error(response, 400, error_message.user_not_found)
            }

            const verify_password = await this.bcrypt_handler.verifyPasswordHash(body.password as string, auth_profile?.password as string)
            if (!verify_password) {
                return this.error(response, 400, error_message.password_incorrect)
            }

            if (auth_profile?.disabled) {
                return this.error(response, 403, error_message.profile_disabled)
            }

            const token = await this.jwt_handler.createToken(auth_profile)
            this.jsonResponse<IToken>(response, token)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

    RegisterEnterpirce = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const body: IEnterpriceRegistration = request.body
            const required = ['email', 'password', 'name', 'country_code', 'phone_number', 'country', 'state', 'zip_code', 'enterprice_name', 'location', 'address', 'latitude', 'longitude', 'overview', 'headquaters', 'founded_in', 'industry']
            const validation_error = bodyRequiredValidator(body, required)
            if (validation_error) {
                return this.error(response, 400, null, validation_error)
            }

            body.email = body.email.toLowerCase()
            let user_email = await this.detail_service.authProfile({ email: body?.email })
            if (user_email) {
                return this.error(response, 400, error_message.user_already_exist)
            }

            let user_phone = await this.detail_service.authProfile({ phone: `${body.country_code} ${body.phone_number}` })
            if (user_phone) {
                return this.error(response, 400, error_message.user_already_exist)
            }

            if (!validatePassword(body?.password)) {
                return this.error(response, 400, error_message.password_strength)
            }

            let designation = await this.detail_service.designation({ name: EDesgination.CEO, public: true })
            if (!designation) {
                return this.error(response, 400, error_message.user_already_exist)
            }
            let user: IUser = {
                name: body.name,
                email: body.email,
                phone: `${body.country_code} ${body.phone_number}`,
                role: ERole.USER,
                avatar: body.avatar,
                country: body.country,
                state: body.state,
                zip_code: body.zip_code,
            }
            user = await this.create_service.createUser(user)

            body.password = await this.bcrypt_handler.getPasswordHash(body.password)
            let auth_profile: IAuth = {
                user: user._id,
                email: user.email,
                phone: user.phone,
                password: body.password,
                role: user.role,
            }
            auth_profile = await this.create_service.createAuthProfile(auth_profile)

            let enterprice: IEnterprice = {
                name: body?.enterprice_name,
                logo: body?.logo,
                overview: body?.overview,
                website: body?.website,
                headquaters: body?.headquaters,
                founded_in: body?.founded_in,
                industry: body?.industry,
                size: body?.size,
                created_by: user?._id
            }
            enterprice = await this.create_service.createEnterprice(enterprice)

            let unit: IUnit = {
                location: body?.location,
                address: body?.address,
                coordinates: {
                    type: ECordinate.POINT,
                    coordinates: [body.longitude, body.latitude]
                },
                enterprice: enterprice?._id as string,
                created_by: user?._id
            }
            unit = await this.create_service.createUnit(unit)

            let employee: IEmployee = {
                user: user?._id as string,
                designation: designation?._id as string,
                enterprice: enterprice?._id as string,
                work_period_start: getCurrentDateAndTime(),
                previous_designation: [
                    {
                        designation: designation?._id as string,
                        start_date: getCurrentDateAndTime(),
                        is_current: true
                    }
                ],
                status: EEmployeeStatus.WORKING,
                is_owner: true,
                created_by: user?._id
            }
            employee = await this.create_service.createEmployee(employee)

            const token = await this.jwt_handler.createToken(auth_profile)
            this.jsonResponse<IToken>(response, token)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

}