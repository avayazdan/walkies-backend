import express from 'express'
import commentscontroller from '../controllers/commentscontroller.js'
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

router.route("/dogs/:dogId")
  .get(auth, dogsController.show)
  .put(auth, dogsController.update)
  .delete(auth, dogsController.remove)

router.route("/messages/:dogId")
  .get(auth, commentscontroller.show)
  .post(auth, commentscontroller.create)

router.route("/register")
  .post(userController.register)
  .get(userController.viewUsers)

router.route("/signin")
  .post(userController.login)

export default router 