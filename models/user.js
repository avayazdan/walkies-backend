import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  image: { type: String, required: true },
  location: { type: String, required: true },
  aboutMe: { type: String, required: true },
  avaliability: { type: String, required: true }, 
  eMail: { type: String, required: true, unique: true, maxLength: 50 },
  password: { type: String, required: true, minLength: 8 },
  role: { type: String, enum: ["owner", "borrower"] },
  registeredAt: { type: Date, default: Date.now },

})

export default mongoose.model('User', userSchema)