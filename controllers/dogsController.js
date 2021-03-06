import Dog from "../models/dog.js"

// Dog emojis for text: ðķððĶŪðĐðâðĶšðūðĶī

// index / get all dogs function 

async function index(req, res) {
  console.log(req)
  try {
    if (["owner"].includes(req.currentUser.role)){
      const dogsToDisplay = await Dog.find({createdBy: req.currentUser._id})
      res.send(dogsToDisplay)
    }
    else{
      const dogs = await Dog.find().select("-comments")
    res.send(dogs)
    }
    
  } catch (e) {
    res.send({ message: "problem finding your dog ð" })
  }
}

// create / list your dog

async function create(req, res, next) {
  console.log(req)
  if (!["owner"].includes(req.currentUser.role)) {
    return res.status(400).json({
      //     message: "You need to be an owner to create a dog! ð",
    })
  }
  const newDog = req.body
  newDog.createdBy = req.currentUser._id
  try {
    const createdDog = await Dog.create(newDog)
    console.log(createdDog)
    res.status(201).json(createdDog)
  } catch (err) {
    next(err)
  }
}

// show / get one dog

async function show(req, res, next) {
  const dogName = req.params.dogId

  // we will need to update this to use ID in future
  try {
    const dogToShow = await Dog.find({ _id: dogName })
    if (!dogToShow) {
      res.status(400).json({ message: "We couldn't find this doggo, it must've gone walkies ðū" })
    }
    return res.status(200).json(dogToShow)
  } catch (e) {
    console.log(e)
    res.json({ message: "We encountered an error ð" })
  }
}

// update / update your dog

async function update(req, res, next) {
  if (req.currentUser.role === "borrower") {
    return res.status(400).json({ message: "You aren't the dog owner to make any changes. ð" })
  }
  const { dogId } = req.params
  try {
    const dogToUpdate = await Dog.findById(dogId)

    if (!dogToUpdate) {
      return res.status(204).json({ message: "We couldn't find that dog to update it" })
    }

    console.log(dogToUpdate.createdBy)

    if (!req.currentUser._id.equals(dogToUpdate.createdBy)) {
      return res
        .status(401)
        .send({ message: "Unauthorized - You didn't create this dog" })
    }
    dogToUpdate.set(req.body)
    const updatedDog = await dogToUpdate.save()
    return res.status(200).send({ message: `We've updated ${updatedDog.name}` })
  } catch (e) {
    res.send({ message: "Error" })
  }
}


// remove / delete your dog
async function remove(req, res) {
  const dogName = req.params.id
  try {
    if (req.currentUser.role === "owner") {
      // ! need to add another check here to see if the user is the dog's owner
      const dogToDelete = await Dog.findOneAndDelete({ name: dogName })
      if (!dogToDelete) {
        return res.json({ message: "We couldn't find this dog's profile ð" })
      }
      res.send({ message: `${dogName} profile has been deleted. ð` })
    }
    else {
      res.status(400).send({ message: "You need a dog owner account to remove your dog. If someone else has listed your dog, please reach out to us on 07*** ******" })
    }
  } catch (e) {
    res.send({ message: "We encountered an error ð" })
  }
}

export default {
  index,
  create,
  show,
  update,
  remove
}