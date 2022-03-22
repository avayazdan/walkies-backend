import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function register(req, res, next) {
  try {
    console.log(req.body.eMail)
    const existingUser = await User.findOne({ eMail: req.body.eMail })
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({ ...req.body, password: hashedPassword })
    res.status(201).json(newUser)
  } catch (e) {
    next(e)
  }
}
  

  async function login(req, res, next) {
    const user = await User.findOne({ userName: req.body.userName })
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." })
    }
  
    const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid Credentials." })
    }
  
    const payload = {
      userName: user.userName,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    console.log(token)
    res.status(200).json({ token })
  }


  async function viewUsers(req, res, next) {
      try {
          const users = await User.find()
          res.send(users)
      } catch (e) {
          res.send({ message: "issue fetching users" })
      }
  }



export default {
  register,
  login,
  viewUsers
}
