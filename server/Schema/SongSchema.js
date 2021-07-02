import mongoose from 'mongoose'
const { Schema } = mongoose


const dataForUpload = {
  name: { type: String, required: true },
  author: { type: String, required: true },
  upLoadSong: { type: String, required: true },
  songImg: { type: String, required: true },
  amountOfDownloads: { type: String, default: 0 },
 },

const Songs= new Schema({
    songs: [dataForUpload],
 amountOfDownloads: { type: String, default: 0 }
   })

const SongSchema = mongoose.model('songsUpload', Songs)
export default SongSchema