import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const { Schema } = mongoose

const Admin = new Schema({
 email: { type: String, required: true },
 username: { type: String, required: true },
})

Admin.plugin(passportLocalMongoose)
const RecordLabel = mongoose.model('musicappbackend', Admin)

export default RecordLabel
