import { ERole } from "../../constants/enum/auth-enum";
import { EEmployeeStatus } from "../../constants/enum/user-enum";
import { error_message } from "../../constants/error-constants";
import { IAuth, IToken, IUser, IUserRegistration } from "../../interface/auth-interface";
import { ExpressRequest, ExpressResponse } from "../../interface/server-interface";
import { IProfile } from "../../interface/user-interface";
import { CreateService } from "../../service/create-service";
import { DetailService } from "../../service/detail-services";
import { BcryptHandler } from "../../utilities/handler/bcrypt-handler";
import { ControllerHandler } from "../../utilities/handler/controller-handler";
import { JwtHandler } from "../../utilities/handler/jwt-handler";
import { bodyRequiredValidator, validatePassword } from "../../utilities/handler/validation-handler";
import { RedisHandler } from "../../utilities/redis-handler";
import { redisHandler } from "../../utilities/redis-handler";
export class UserController extends ControllerHandler {
    private detail_service = new DetailService()
    private create_service = new CreateService()
    private bcrypt_handler = new BcryptHandler()
    private jwt_handler = new JwtHandler()
    private redis_handler = redisHandler;
    profile = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const userId = request.payload?.user_id;
            console.log('userId',userId)
            if (!userId) {
                return this.error(response, 400, null, "User not found in request");
            }
            const cacheKey = `user:profile:${userId}`;
            console.log('cacheKey',cacheKey)
            // 1️⃣ Check cache first
            const cachedProfile = await this.redis_handler.get(cacheKey);
            console.log('cachedProfile////////////////////////',cachedProfile)
            if (cachedProfile) {
                console.log(`Cache hit for ${cacheKey}`);
                const profile = JSON.parse(cachedProfile);
                return this.jsonResponse<IProfile>(response, profile);
            }

            // 2️⃣ Cache miss → Fetch from DB
            console.log(`Cache miss for ${cacheKey}`);
            const user = await this.detail_service.authProfile({ user: userId });
            if (!user) {
                return this.error(response, 404, null, "User not found");
            }

            const profile = {
                ...(user as any)?._doc
            };

            // 3️⃣ Store in cache for 60 seconds
            await this.redis_handler.set(cacheKey, profile, 120);

            // 4️⃣ Send response
            this.jsonResponse<IProfile>(response, profile);
        } catch (error) {
            this.error(response, 500, null, error);
        }
    }

    userRegistration = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const body: IUserRegistration = request.body
            const required = ['email', 'password', 'name', 'country_code', 'phone_number', 'country', 'state', 'zip_code']
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
            const token = await this.jwt_handler.createToken(auth_profile)
            this.jsonResponse<IToken>(response, token)
        } catch (error) {
            this.error(response, 500, null, error)
        }
    }

}