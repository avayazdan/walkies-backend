import Dog from '../models/dog.js'


async function show(req, res, next) {
  const { dogId } = req.params

  // we will need to update this to use ID in future
  try {
    const dogToShow = await Dog.findById(dogId)
    if (!dogToShow) {
      res.status(400).send({ message: "We couldn't find this doggo, it must've gone walkies 🐾" })
    }
      if (!req.currentUser._id.equals(dogToShow.createdBy)) {
          return res
              .status(401)
              .send({ message: "Unauthorized - You didn't create this dog" })
      }
      res.send(dogToShow.comments)
  } catch (e) {
    res.send({ message: "We encountered an error 🐕" })
  }
}

async function create(req, res, next) {
    const { body: newComment } = req
    const { dogId } = req.params
    newComment.createdBy = req.currentUser._id

    try {
        const dogToCommentOn = await Dog.findById(dogId)

        dogToCommentOn.comments.push(newComment)
        const updatedDog = await dogToCommentOn.save()
        return res.status(200).json({ message: `Your message has been sent to ${updatedDog.name}'s owner. 🐕` })
    } catch (err) {
        next(err)
    }

}

export default {
    create,
    show
}