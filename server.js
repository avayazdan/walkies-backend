import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'
import { connectToDb } from './db/helpers.js'
import dotenv from "dotenv"
import cors from 'cors'

async function startServer() {
  const app = express()

  dotenv.config();
  const PORT = process.env.PORT ? process.env.PORT : 4000
  app.use(cors())
  // setting up express to use

  app.use(express.json())
  app.use(logger)
  app.use(router)
  app.use(errorHandler)
 

  await connectToDb()
  console.log('Walkie\'s message to you! ')
  app.listen(PORT, () => console.log(`Express server running on Port ${PORT}`))
}
startServer()