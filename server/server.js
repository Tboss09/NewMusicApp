import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import passport from 'passport'
import LocalPassport from 'passport-local'
import path from 'path'
import PostRoute from './routes/PostRoute.js'
import route from './routes/route.js'
import RecordLabel from './Schema/Schema.js'
import SongSchema from './Schema/SongSchema.js'
// server initialisation
const app = express()
const port = process.env.PORT || 4000 // Config
dotenv.config()

app.use(cors())

app.use(express.json({ limit: '80mb', extended: true }))
app.use(
 express.urlencoded({ limit: '80mb', extended: true, parameterLimit: 80000 })
)
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*')
 next()
})
app.use(passport.initialize())
app.use(passport.session())

// passport Config
passport.serializeUser(RecordLabel.serializeUser())

const LocalStrategy = LocalPassport.Strategy
passport.use(new LocalStrategy(RecordLabel.authenticate()))
passport.deserializeUser(RecordLabel.deserializeUser())
// passport Config

// Login config

//Login config

// Database initialization and connection
const promise = mongoose.connect(process.env.MONGODB_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
})

const db = mongoose.connection
let gfs
let newIdForSong

const storage = new GridFsStorage({
 db: promise,
 file: (req, file) => {
  return new Promise((resolve, reject) => {
   fs.readFile('file.txt', 'utf-8', (err, data) => {
    if (err) {
     return reject(err)
    }

    const newData = JSON.parse(data)
    const { author, songName } = newData

    const filename = `${songName}_${author}` + path.extname(file.originalname)
    const fileInfo = {
     filename: filename,
     bucketName: 'RecordLabelSong',
    }
    resolve(fileInfo)
   })
  })
 },
})
const upload = multer({ storage })

db.once('open', function () {
 app.use('/', route)
 app.use('/', PostRoute)
 const checkToken = (req, res, next) => {
  const header = req.headers['authorization']

  if (typeof header !== 'undefined') {
   const bearer = header.split(' ')
   const token = bearer[1]
   req.token = token
   console.log(token)
   next()
  } else {
   //   If header is undefined return Forbidden (403)
   res.status(403).json({ message: 'Forbidden' })
  }
 }
 app.get('/verifyUser', checkToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
   if (err) {
    //   If error send Forbidden (403)
    console.log('ERROR: Could not connect to the protected route')
    res.status(403).json({ message: 'forbidden' })
   } else {
    //  If token is successfully verified, we can send the authorized data
    res.json({
     message: 'Successful log in',
     authorizedData,
    })
    console.log('SUCCESS: Connected to protected route')
   }
  })
 })

 console.log('Database successfully connected')
 gfs = new mongoose.mongo.GridFSBucket(db.db, {
  bucketName: 'RecordLabelSong',
 })

 app.get('/', (req, res) => {
  res.send('Hi there')
 })
 // Post new User song and author
 //Server first post new with song and image as empty string, then it posts the song and image
 app.post('/upload', (req, res) => {
  const { author, songName } = req.body
  const song = { author: author, songName: songName, image: '', song: '' }
  const mongooseId = '60e78d4da1e1a90ffc312ea8'
  SongSchema.findOneAndUpdate(
   { _id: mongooseId },
   { $push: { songs: song } },
   { new: true },

   function (error, success) {
    if (success) {
     SongSchema.findById(mongooseId)
      .select({ songs: { $slice: -1 } })
      .exec((err, doc) => {
       newIdForSong = doc.songs[0]._id
       console.log(newIdForSong)
       const songProfile = {
        songName: req.body.songName,
        author: req.body.author,
        id: doc.songs[0]._id,
       }
       fs.writeFile('file.txt', JSON.stringify(songProfile), err => {
        err && console.log(err)
        console.log('file create success')
       })
      })

     return
    } else {
     console.log(err)
    }
   }
  )
 })

 app.post('/upload/song', upload.array('file', 3), (req, res, next) => {
  const files = req.files
  console.log(req.body, files)

  if (files !== undefined) {
   const file = files.map(file => {
    return file.filename
   })
   console.log(req.body, files)

   fs.readFile('file.txt', 'utf-8', (err, data) => {
    const id = JSON.parse(data).id
    console.log(id)

    SongSchema.update(
     { 'songs._id': mongoose.Types.ObjectId(`${id}`) },
     {
      $set: {
       'songs.$.image': file[1],
       'songs.$.song': file[0],
      },
     },
     (err, success) => {
      if (err) {
       res.status(400).json({ success: false, message: `Error:${err}` })
      }
      res
       .status(201)
       .json({ success: false, message: `Song was successfully added` })
      console.log(err, success)
     }
    )
   })
  }
 })


 app.get('/upload/:filename', (req, res) => {
  const fileName = req.params.filename
  gfs.find({ filename: fileName }).toArray((err, files) => {
   if (!files[0] || files.length === 0) {
    return res.status(404).json({
     success: false,
     message: 'file not found',
    })
   } else {
    gfs.openDownloadStreamByName(fileName).pipe(res)
   }
  })
 })

 //  get all files
 app.get('/allSongs', (req, res) => {
  SongSchema.find({})
   .then(data => {
    res.status(200).json({ success: true, data })
   })
   .catch(err => {
    res.status(404).json({ success: false, message: err })
    console.log(err)
   })
 })

 app.listen(port, () => {
  console.log(`Server Listening at port ${port}`)
 })
})

db.on('error', console.error.bind(console, 'Connection Error:'))
