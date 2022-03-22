import express from 'express'
// import dogsController from '../controllers/dogsController.js'
// import userController from '../controllers/userController.js'

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("API Running");
});

router.route("/dogs")
  .get((req, res) => res.json({ message: 'hello dogs' }))
  .post((req, res) => res.json({ message: 'hello dogs post' }))

router.route("/dogs/:id")
  .get((req, res) => res.json({ message: 'hello DOG' }))
  .put((req, res) => res.json({ message: 'hello dogs put' }))
  .delete((req, res) => res.json({ message: 'hello dogs delete' }))

router.route("/messages/:id")
  .get((req, res) => res.json({ message: 'hello message' }))
  .post((req, res) => res.json({ message: 'hello message post' }))

router.route("/register")
  .post((req, res) => res.json({ message: 'hello registered' }))

router.route("/signin")
  .post((req, res) => res.json({ message: 'hello signed in' }))

export default router 