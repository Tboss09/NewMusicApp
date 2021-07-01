import express from 'express'
const router = express.Router()
import {
 AdminLogin,
 SignUpAdmin,
} from '../controllers/controller.js'

router.post('/signup', SignUpAdmin)
router.post('/admin', AdminLogin)
export default router
