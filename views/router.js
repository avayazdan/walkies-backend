import express from 'express'
import dogsController from '../controllers/dogsController.js'
import userController from '../controllers/userController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("API Running");
});

router.route("/dogs")
  .get(auth, dogsController.index)
  .post(auth, dogsController.create)

router.route("/dogs/:id")
  .get(auth, dogsController.show)
  .put(auth, dogsController.update)
  .delete(auth, dogsController.remove)

router.route("/messages/:id")
  .get((req, res) => res.json({ message: 'hello message' }))
  .post((req, res) => res.json({ message: 'hello message post' }))

router.route("/register")
  .post(userController.register)
  .get(userController.viewUsers)

router.route("/signin")
  .post(userController.login)

export default router 