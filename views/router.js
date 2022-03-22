import express from 'express'
import dogsController from '../controllers/dogsController.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("API Running");
});

router.route("/dogs")
  .get(dogsController.index)
  .post(dogsController.create)

router.route("/dogs/:id")
  .get(dogsController.show)
  .put(dogsController.update)
  .delete(dogsController.remove)

router.route("/messages/:id")
  .get((req, res) => res.json({ message: 'hello message' }))
  .post((req, res) => res.json({ message: 'hello message post' }))

router.route("/register")
  .post(userController.register)

router.route("/signin")
  .post(userController.login)

export default router 