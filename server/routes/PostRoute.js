import express from 'express'
const router = express.Router()
import { AdminLogin, SignUpAdmin,CreateNewSong } from '../controllers/controller.js'

router.post('/signup', SignUpAdmin)
router.post('/admin', AdminLogin)

// Songs Uploading

router.post('/music', CreateNewSong)
// Songs Uploading

export default router
