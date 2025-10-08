import { Router } from "express"
import { UserController } from "../../controller/user/user-controller"
import { JwtHandler } from "../../utilities/handler/jwt-handler"
import { ERole } from "../../constants/enum/auth-enum"
const router = Router()

const user_controller = new UserController()
const jwt_handler = new JwtHandler()

router.get('/profile',jwt_handler.accessPermission(),(req,res)=>user_controller.profile(req,res))
router.post('/registration',(req,res)=>user_controller.userRegistration(req,res))

export default router