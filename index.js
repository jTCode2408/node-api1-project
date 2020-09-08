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
    if (userData.name && userData.bio){
    Users.insert(userData)
    .then(user=>{
        console.log(userData);
        res.status(201).json({
            name:userData.name,
            bio:userData.bio,
            created_at:Date.now(),
            udpated_at:Date.now() 
        })
    })
    
.catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
  });
 } else {
    res.status(400).json({errorMessage: "Please provide name and bio for the user." })
 }
})
//get user by id(/api/users:id, findById)
server.get('/api/users/:id', (req,res)=>{
    const {id} = req.params;
    Users.findById(id)
    .then(userId =>{
      if (userId){
        res.status(200).json(userId)
      } else {
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
    // const {id} = req.params.id;
    Users.remove(req.params.id)
    .then(removed =>{
    res.status(200).json(removed);
     
    })
    .catch(err=>{
    console.log(err);
    if(!id){
        res.status(500).json({errorMessage: "The user could not be removed"})  
    } else {
    res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
    })

})

//PUT.update(): accepts two arguments,id of the user to update, & object with the changes to apply.If the count is 1 it means the record was updated correctly.
server.put('/api/users/:id', (req,res)=>{
    const editData = req.body
    const{id} = req.params;
    Users.findById(id)
    .then(edited =>{
        if(edited){
            if(editData.name && editData.bio){
        Users.update(id, editData)
        .then(edited=>{
        res.status(201).json(editData)
    })
    
    .catch(err=>{
        console.log(err);
        res.status(500).json({ message: "The user information could not be modified."})
    })
            } else {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
            }
            } else{
            res.status(404).json({ errorMessage: "The user with the specified ID does not exist."})
            }
    })
})

const port = 5000;
server.listen(port, ()=>console.log(`\n** API on port ${port}\n`));