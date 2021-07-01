import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import LocalPassport from 'passport-local'
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
passport.use(new LocalStrategy(RecordLabel.authenticate()) )
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

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
 console.log('Database succesfully connected')

 app.use('/api/v1', route)
 // Post request
 app.use('/api/v1/', PostRoute)

 app.listen(port, () => {
  console.log(`Server Listening at port ${port}`)
 })
})
