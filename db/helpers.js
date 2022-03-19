import mongoose from "mongoose";

export function connectToDb() {
    return mongoose.connect("mongodb://127.0.0.1:27017/dogs")

}

export function disconnectDb() {
    // checking if the db is not disconnected
    if (mongoose.connection.readyState !== 0) {
        return mongoose.disconnect()
    }
}