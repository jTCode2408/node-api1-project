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
        res.status(201).json(userData)
} else {

    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
}
  
})
.catch(err => {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
  });

})



const port = 5000;
server.listen(port, ()=>console.log(`\n** API on port ${port}\n`));