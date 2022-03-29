import mongoose from 'mongoose'

export function connectToDb() {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  const connectionString = process.env.DB_URI ? process.env.DB_URI : 'mongodb://127.0.0.1:27017/dogs'
  return mongoose.connect(connectionString, opts)

}

export function disconnectDb() {
  // checking if the db is not disconnected
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}