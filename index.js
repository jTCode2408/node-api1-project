// implement your API here
const express = require('express'); //import express
const Users = require('./data/db'); //var for users data 
const server=express();
server.use(express.json());


server.get('/', (req,res)=>{
    res.json({start:'Initial Server Start'})
})

//get all users api/users
server.get('/api/users', (req,res)=>{
    Users.find()
    .then(users =>{
        res.status(200).json({users});

    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })
})

//POST(add user, method called 'insert')
server.post('/api/users', (req,res)=>{
    const userData = req.body
    Users.insert(userData)
    .then(user=>{
        console.log(userData);
        if (userData.name && userData.bio) {
        res.status(201).json({user, userData})
} else {
    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
}
})
.catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
  });

})
//get user by id(/api/users:id, findById)
server.get('/api/users/:id', (req,res)=>{
    const {id} = req.params;
    Users.findById(id)
    .then(userId =>{
        if (userId.id === id){
        res.status(200).json(userId)
        } else{
            res.status(404).json({errorMessage:"user with specified ID does not exist"})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage: "The user information could not be retrieved." });

    })
})


//DELETE(/api/usres/id, remove)
server.delete('/api/users/:id', (req,res)=>{
    const {id} = req.params;
    Users.remove(id)
    .then(removed =>{
    res.status(200).json(removed.id);
        
    })
    .catch(err=>{
    console.log(err);
    if (removed.id !== id){
    res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else{
    res.status(500).json({errorMessage: "The user could not be removed"})
}

    })

})



//PUT.update(): accepts two arguments, the first is the id of the user to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.

const port = 5000;
server.listen(port, ()=>console.log(`\n** API on port ${port}\n`));