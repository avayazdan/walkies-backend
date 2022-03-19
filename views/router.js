import express from 'express'
// import dogsController from '../controllers/dogsController.js'
// import userController from '../controllers/userController.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send("API Running");
});

router.route("/dogs")
    .get((req, res) => res.json({ message : 'hello dogs'}))

export default router 