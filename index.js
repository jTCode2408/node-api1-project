// implement your API here
const express = require('express'); //import express
const Users = require('./data/db'); //var for users data 
const server=express();

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









const port = 5000;
server.listen(port, ()=>console.log(`\n** API on port ${port}\n`));