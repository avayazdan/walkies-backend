import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  text: { type: String, maxlength: 300 },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  sentAt: { type: Date, default: Date.now },
})

const dogSchema = new mongoose.Schema({
  // ? Inside here live our fields
  name: { type: String, required: true, maxLength: 50 },
  image: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  availability: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  comments: [commentSchema]
})

export default mongoose.model('Dog', dogSchema)