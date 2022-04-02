## Walkies - Group Project

Deployed at: https://walkiessei22.netlify.app/

This project was lovingly made by [Ava](https://github.com/avayazdan), [Claudia](https://github.com/claudiatmcp) and [Laura](https://github.com/laura-arch).

## Project Requirements

This project was built for project three of General Assembly's Full-Stack Software Engineering course. The project aim was to build our own API, utilise our growing knowledge of React as well as connecting backend to frontend for the first time. The project specs allowed us to take inspiration from complex websites/apps that use data such as AirBnb or Facebook, and essentially rebuild it in our own way if we desire.

### Table of contents 

1. Project aims & inspiration 
2. Planning 
3. Build
4. Styling
5. Challenges and Wins
6. Future improvements

### Project aim 

Walkies is a dog borrowing site, inspired by www.borrowmydoggy.com

The functionality of Walkies includes:

- Register a user
- Login a user
- View dogs once you are logged in
- Create a dog
- Message the dog's owner to arrange `walkies`!


### Planning 


![Untitled-2022-03-31-0020](https://user-images.githubusercontent.com/75817925/161280307-a79a28e1-e83e-4cd6-bba9-64ae7e568f6b.png)

Our planning consisted of mostly discussing ideas and their potential caveats or benefits. Once we agreed on an idea, we researched other websites and their functionality and chose what we would like to implement in our own project. As shown above, we used Excalidraw to wireframe our project. Naturally, as we progressed deeper into our project and realised potential flaws or caveats, elements of our wirefrime were changed or edited to suit the new functionalities or elements.
A big part of our planning as well as process was using Trello for organisation and predicting our timeline. This helped tremendously with time management and awareness of what needs to be done next during our the process of building our project. 

![Untitled](https://user-images.githubusercontent.com/75817925/161281508-a9f4ac23-2d69-4140-9ad3-8ea52729a37d.png)

### Build

The project utilises React, HTML and CSS. As well as MongoDB, NPM and Mongoose. We used Insomnia and Postman to test our API's data and we stored our data on the MongoDB Atlas cloud at the end of week one. We started by building our backend/API together as a team, we utilised VScode LiveShare and we pushed to the same main branch during this week. During week two, we switched up our workflow, and started using our own Git branches, the reason for this was because on the frontend we split up individual tasks/components, whereas the backend was built together. 

#### Backend 

Our backend and client were split up in two seperate files and were two seperate Git repositories. We built a CRUD API to let users create dogs/users and to store our User and Dog data. During our process, we didn't use dummy data - rather we opted to upload testing data via apps like Insomnia or Postman. Our backend consists of User schema, Dog schema, middleware for authorization and error handling, a router, and of course, controllers - which held the functions and logic for our API to work. For example: 

```
// create / list your dog

async function create(req, res, next) {
  console.log(req)
  if (!["owner"].includes(req.currentUser.role)) {
    return res.status(400).json({
      //     message: "You need to be an owner to create a dog! 🐕",
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
```

The utilisation of Mongoose made it more simple for us to write the logic for our API and what we require it to do. The built in CRUD related methods, for example: 

```
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
  ```
  #### Frontend 
  
  As this is a React app, we followed the methodology and popular conventions of React apps - such as creating **src** folders and **components**. We first began by creating all of our needed components as well as our **App** and **Index** **.js**. We also used **axios** for fetching our API data. 
 
   ```
   axios({
          method: 'get',
          url: 'https://walkies-backend.herokuapp.com/dogs',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then(response => {
          // Console logging the data
          console.log(`doggo data: `);
          console.log(response.data)
  ```

### Styling

Our styling was inspired by colourful and animated websites surrounding our chosen topic. We wanted to make it look modern and easy-to-read. One interesting aspect of our project was that we opted out of using stock photos to using photos of family/friends and ourselves in the Community Stories section in our home page, which subsequently gives our project a more personalised feel. Originally, we had planned to use a styling library, however underestimated how complicated they can actually get! So ultimately we opted for vanilla CSS as to save us some time. For future projects we would aim to implement a styling library for learning and experience purposes. 


### Challenges & wins

#### Wins

One of our wins was working efficiently as a team, organising effectively and utilising the tools available to us effectively. Another win was accepting kind critisim  from each other on small things that we may have different opinions on, we listened to eachother with respect and no one overuled one another, it could even be argued that we mastered the skill of working efficiently as a team in a short amount of time! Speaking of time - that was another win of ours. We moved with quick pacing fromt the very get go and that could also be down to our efficient organisation methods and skills. 

#### Challenges 

We had a few challanges - such as connecting to MongoDB, deploying our backend without errors and finally (arguably the largest one) uploading our dog data via the frontend to the database successfully. Luckily we had the help of our tutors but we always tried to work on the problem for a couple of hours before asking for help. 

### Future improvements or changes

A Favorites page would be a great addition to our project (adding a dog or a borrower to your favorites, storing them for later). Another improvement would be implementing a chat messenger where users can interact with eachother in real time. 



  

