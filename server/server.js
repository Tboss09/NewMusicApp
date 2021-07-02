import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import LocalPassport from 'passport-local'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'

import PostRoute from './routes/PostRoute.js'
import route from './routes/route.js'
import RecordLabel from './Schema/Schema.js'

// server initialisation
const app = express()
const port = 8000 || process.env.PORT
// Config
dotenv.config()
app.use(cors())
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

// passport Config
passport.serializeUser(RecordLabel.serializeUser())

const LocalStrategy = LocalPassport.Strategy
passport.use(new LocalStrategy(RecordLabel.authenticate()))
passport.deserializeUser(RecordLabel.deserializeUser())
// passport Config

// Login config

// Login config

// Database initialization and connection
mongoose.connect(process.env.MONGODB_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
})

const db = mongoose.connection

app.use('/api/v1', route)
// Post request
app.use('/api/v1/', PostRoute)

let gfs
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
 console.log('Database succesfully connected')
 gfs = Grid(db.db, mongoose.mongo)
 gfs.collection('uploads')

 //  create a Storage Engine engine
 let storage =  GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
   return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
     if (err) {
      return reject(err)
     }
     const filename = buf.toString('hex') + path.extname(file.originalname)
     const fileInfo = {
      filename: filename,
      bucketName: 'uploads',
     }
     resolve(fileInfo)
    })
   })
  },
 })
 const upload = multer({ storage })
 //  create a Storage Engine engine

 app.post('/upload', upload.single('file-upload'), (req, res) => {
  res.json({ file: req.file })
 })

 app.listen(port, () => {
  console.log(`Server Listening at port ${port}`)
 })
})
