const express = require("express");
const { model } = require("mongoose");
const Task= require('../models/task')

const router  = new express.Router()




/// This routes post the tasks to database
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body);j

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

    // task.save().then((result) =>{
    //     res.status(201).res.send(result);
    // }).catch((error) => {
    //     //throw new Error ("Unable to save the user data");
    //     res.status(400).send(error)
    // })
})




// This router will fetch the all tasks details 

router.get('/tasks' , async(req, res) =>{

    try{
        const task = await Task.find({})
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})



// This router gets the details of the one taks based on the id provided on the url


router.get('/tasks/:id' , async(req,res) =>{
    const _id = req.params.id
    try{
        const task1 = await Task.findById(_id);
        if(!task1){
            res.status(401).send("Not found")
        }
        res.status(200).send(task1)
    }catch(e){
        res.status(201).send(e);
    }
})

router.patch('/tasks/:id' , async(req, res) =>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error : 'Invalid updates'});
    }
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body ,{ new :true , runValidators :true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete ('/tasks/:id' , async(req, res) =>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(401).send(user , "task not found")
        }
        return res.status(201).send("success fully deleted")
    }catch(e){
        res.status(400).send("something went wrong")
    }
})

module.exports = router