import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import multer from 'multer'
import path from 'path'
import { GridFsStorage } from 'multer-gridfs-storage'
import crypto from 'crypto'
import LocalPassport from 'passport-local'
import PostRoute from './routes/PostRoute.js'
import route from './routes/route.js'
import RecordLabel from './Schema/Schema.js'
// server initialisation
const app = express()
const port = 8000 || process.env.PORT // Config
dotenv.config()

app.use(cors())

app.use(express.json({ limit: '80mb', extended: true }))
app.use(
 express.urlencoded({ limit: '80mb', extended: true, parameterLimit: 80000 })
)

app.use(passport.initialize())
app.use(passport.session())

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
let gfs

app.use('/api/v1', route)
// Post request
app.use('/api/v1/', PostRoute)

const storage = new GridFsStorage({
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

db.once('open', function () {
 gfs = new mongoose.mongo.GridFSBucket(db.db, {
  bucketName: 'uploads',
 })
 app.post('/upload', upload.array('file'), async (req, res, next) => {
  upload.any()
  const files = await req.files
  const body = await req.body

  console.log(body, files)

  if (files !== undefined) {
   const file = files.map(file => {
    return file.filename
   })

   
   const body = await req.body
   console.log(files, body, file)
  }
 })

 app.get('/upload/:filename', (req, res, next) => {
     const fileName = req.params.filename
     gfs.find({ filename: fileName}).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
         return res.status(400).json({
          success: false,
          message: 'No files',
         })
        }
        gfs.openDownloadStreamByName(fileName).pipe(res)
       })
       
  
 })

//get all files
 app.get('/files', (req, res, next) => {
  console.log('/files')
  gfs.find().toArray((err, files) => {
   res.status(200).json({
    success: true,
    files,
   })
  })
 })

 app.listen(port, () => {
  console.log(`Server Listening at port ${port}`)
 })
 console.log('Database succesfully connected')
})
db.on('error', console.error.bind(console, 'connection error:'))
