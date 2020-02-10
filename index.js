// implement your API here
const express = require('express'); //import express
const Users = require('./data/db'); //var for users data 
const server=express();

server.get('/', (req,res)=>{
    res.json({start:'Initial Server Start'})
})

const port = 5000;
server.listen(port, ()=>console.log(`\n** API on port ${port}\n`));