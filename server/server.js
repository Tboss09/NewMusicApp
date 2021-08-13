import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import crypto from 'crypto'
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
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import RecordLabel from './Schema/Schema.js'
import SongSchema from './Schema/SongSchema.js'
// server initialisation
const app = express()
const port = process.env.PORT || 4001 // Config
dotenv.config()

app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(express.static(path.resolve(__dirname, `./build`)))
app.use(express.json({ limit: '80mb', extended: true }))
app.use(
 express.urlencoded({ limit: '80mb', extended: true, parameterLimit: 80000 })
)
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*')
 next()
})
// passport Config
app.use(passport.initialize())
app.use(passport.session())

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
   crypto.randomBytes(16, (err, buf) => {
    if (err) {
     return reject(err)
    }
    const filename = buf.toString('hex') + path.extname(file.originalname)
    const fileInfo = {
     filename: filename,
     bucketName: 'AllRecordLabelSongsAndImages',
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
  console.log(req.token)
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
   if (err) {
    //   If error send Forbidden (403)
    console.log('ERROR: Could not connect to the protected route')
    res.status(403).json({ message: 'forbidden' })
   } else {
    //  If token is successfully verified, we can send the authorized data
    res.status(200).json({
     message: 'Successful log in',
     authorizedData,
    })
    console.log('SUCCESS: Connected to protected route')
   }
  })
 })
 //  Collection to store images
 app.get('/', (req, res) => {
  res.send('Hi there')
 })

 console.log('Database successfully connected')
 gfs = new mongoose.mongo.GridFSBucket(db.db, {
  bucketName: 'AllRecordLabelSongsAndImages',
 })
 app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'))
 })

 // Send amount of downlad of a song
 app.post('/upload/fileDownload', (req, res) => {
  console.log(req.query)
  const { amountOfDownload, _id } = req.query
  SongSchema.update(
   { 'songs._id': mongoose.Types.ObjectId(`${_id}`) },
   {
    $inc: {
     'songs.$.amountOfDownload': amountOfDownload,
    },
   },
   (err, success) => {
    if (err) {
     res.status(400).json({ success: false, message: `Error:${err}` })
     console.log('Error in addtion', err)
    }
    res.status(201).json({ success: false, message: `A song was downloaded` })
    console.log(success)
   }
  )
 })
 // Send amount of downlad of a song
 app.post('/new', (req, res) => {
  const newSongs = new SongSchema({ songs: [] })
  newSongs
   .save()
   .then(res => console.log(res))
   .catch(err => {
    console.log(err)
   })
 })
 // Post new User song and author
 //Server first post new song  with song and image as empty string,
 app.post('/upload', (req, res) => {
  const { author, songName } = req.body
  console.log(req.body)
  const song = { author: author, songName: songName, image: '', song: '' }

  const mongooseId = '6116f2c1b9f7eb22c8b6a468'
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
     console.log(error)
    }
   }
  )
 })

 // then it posts the song and image
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

 //  Get a particular song or image
 app.get('/display/:filename', (req, res) => {
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

 //get all files
 app.get('/allSongs', (req, res) => {
  SongSchema.find({})
   .then(data => {
    res.status(200).json({ success: true, data })
   })
   .catch(err => {
    res.status(404).json({ success: false, message: err })
    console.log(err)
   })

  //  if User searched for a item
  //  Then run the query
 })

 app.listen(port, () => {
  console.log(`Server Listening at port ${port}`)
 })
})

db.on('error', console.error.bind(console, 'Connection Error:'))
