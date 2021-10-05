const express = require("express");
const { model } = require("mongoose");
const User = require('../models/user')

const router  = new express.Router()


// This route post the user data to database
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
    // user.save().then((result) =>{
    //     res.status(201).send(result);
    // }).catch((error) => {
    //    // throw new Error ("Unable to save the user data");
    //    res.status(400).send(error)
    // })
})


// Getting the all details of the users
router.get('/users', async(req,res) =>{

    try{
        const user = await User.find({})
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }

    // User.find().then((users)=>{
    //     res.status(201).send(users);
    // }).catch((e) =>{
    //     res.status(400).send(e);
    // })
})

// Getting the one user id using _id properties
router.get('/users/:id' , async(req,res) =>{
    _id = req.params.id;


    try{
        const user1 = await User.findById(_id);
        if(!user1){
            res.status(401).send("Not found")
        }
        res.status(200).send(user1)
    }catch(e){
        res.status(201).send(e);
    }
  
})

////////////////////////// PATCHING ////////////////////////

router.patch('/users/:id' , async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email' , 'password' , 'age']
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'});
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body , { new : true , runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})




////////////////////// DELETING /////////////////////


router.delete ('/users/:id' , async(req, res) =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(401).send(user , "user not found")
        }
        return res.status(201).send("success fully deleted")
    }catch(e){
        res.status(400).send("There is some issues")
    }
})

module.exports = router;