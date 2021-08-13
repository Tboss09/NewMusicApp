import jwt from 'jsonwebtoken'
import passport from 'passport'
import RecordLabel from '../Schema/Schema.js'

export const getAllMusicFiles = (req, res) => {
 res.status(200).json({ data: 'Hi' })
}

export const getJustOneAudio = (req, res) => {
 res.json('got just one music file')
}

// Sign up new Admin
export const SignUpAdmin = (req, res) => {
 const NewAdmin = new RecordLabel({
  email: req.body.email,
  username: req.body.username,
 })

 RecordLabel.register(NewAdmin, req.body.password, (err, user) => {
  if (err) {
   res.status(404).json({
    success: false,
    message: `"Your account could not be created: ${err}`,
   })
  } else {
   res
    .status(201)
    .json({ success: true, message: 'Your account has been saved' })
  }
 })
}

export const AdminLogin = (req, res) => {
 console.log(req.body)
 if (!req.body.username) {
  res.status(404).json({ success: false, message: 'Username was not given' })
  console.log('Username not given')
 } else {
  if (!req.body.password) {
   res.status(404).json({ success: false, message: 'Password was not given' })
   console.log('Password not given')
  } else {
   passport.authenticate('local', function (err, user, info) {
    if (err) {
     res.json({ success: false, message: err })
     console.log('Error:', err)
    } else {
     if (!user) {
      console.log('Error:', 'username or password incorrect')
      res.status(404).send('Incorrect username or Password')
     } else {
      req.login(user, function (err) {
       if (err) {
        console.log('Error:', 'One more error', err)
        res.status(404).json({ success: false, message: err })
       } else {
        const token = jwt.sign(
         { userId: user._id, username: user.username },
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRES_IN }
        )
        res.status(200).json({
         success: true,
         user: user,
         message: `Authentication successful`,
         token: token,
        })
        console.log('Sign in successful', token)
       }
      })
     }
    }
   })(req, res)
  }
 }
}

// Sign up new Admin

// Create new Song
export const CreateNewSong = (req, res) => {
 const data = req.body
 console.log(data)
}
