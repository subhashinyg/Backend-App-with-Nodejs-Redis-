import { Router } from 'express'
import { AuthController } from '../../controller/auth/auth-controller'
const router = Router()

const auth_controller = new AuthController()

router.post('/login',(req,res)=>auth_controller.login(req,res))
router.post('/enterprice-registration',(req,res)=>auth_controller.RegisterEnterpirce(req,res))
export default router