import mongoose from 'mongoose'
const { Schema } = mongoose

const musicUpload = {
 songName: { type: String, required: true },
 author: { type: String, required: true },
 filename: { type: String, required: true },
 fileId: { type: String, required: true },
 amountOfDownload: { type: Number, default: 0 },
 createdAt: {default: Date.now(),type: Date,},
}

const Songs = new Schema({
 song: [musicUpload],
})
const UploadSong = mongoose.model('songUpload', Songs)
export default UploadSong
