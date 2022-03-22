import Dog from "../models/dog.js"

// Dog emojis for text: 🐶🐕🦮🐩🐕‍🦺🐾🦴

// index / get all dogs function 

async function index(req, res) {
  console.log(req)
  try {
    const dogs = await Dog.find()
    res.send(dogs)
  } catch (e) {
    res.send({ message: "problem finding your dog 🐕" })
  }
}

// create / list your dog

async function create(req, res, next) {
  console.log(req)
  // if (!["owner"].includes(req.currentUser.role)) {
  //   return res.status(400).json({
  // //     message: "You need to be an owner to create a dog! 🐕",
  //   })
  // }
  // const newDog = req.body
  // newDog.createdBy = req.currentUser._id
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
  const dogName = req.params.id
  // we will need to update this to use ID in future
  try {
    const dogToShow = Dog.find({ name: dogName })
    if (!dogToShow) {
      res.status(400).send({ message: "We couldn't find this doggo, it must've gone walkies 🐾" })
    }
    res.send(dogToShow)
  } catch (e) {
    res.send({ message: "We encountered an error 🐕" })
  }
}



// update / update your dog

async function update(req, res, next) {
  // if (req.currentUser.role === "borrower") {
  //   return res.status(400).json({ message: "You aren't the dog owner to make any changes. 🐕" })
  // }
  try {
    const dogToUpdate = await Dog.findOneAndUpdate({ id: req.params.id }, { name: req.body.name, image: req.body.image, breed: req.body.breed, age: req.body.age, location: req.body.location, description: req.body.description, availability: req.body.availability })
      if (!dogToUpdate) {
    return res.status(204).json({ message: `We couldn't find ${dogToUpdate} to update it` })
  }
  res.send({ message: `We've updated ${req.params.id}` })
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
        return res.json({ message: "We couldn't find this dog's profile 🐕" })
      }
      res.send({ message: `${dogName} profile has been deleted. 🐕` })
    }
    else {
      res.status(400).send({ message: "You need a dog owner account to remove your dog. If someone else has listed your dog, please reach out to us on 07*** ******" })
    }
  } catch (e) {
    res.send({ message: "We encountered an error 🐕" })
  }
}


export default {
  index,
  create,
  show,
  update,
  remove
}