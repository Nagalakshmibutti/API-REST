const express = require("express");
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task');
const { find } = require("./models/task");

const app = express();
const port  = process.env.PORT || 3000;

app.use(express.json())


// This route post the user data to database
app.post('/users', async (req, res) => {
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

/// This routes post the tasks to database
app.post('/tasks', async(req, res) => {
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

// Getting the all details of the users
app.get('/users', async(req,res) =>{

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
app.get('/users/:id' , async(req,res) =>{
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

// This router will fetch the all tasks details 

app.get('/tasks' , async(req, res) =>{

    try{
        const task = await Task.find({})
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})



// This router gets the details of the one taks based on the id provided on the url


app.get('/tasks/:id' , async(req,res) =>{
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



////////////////////////// PATCHING ////////////////////////

app.patch('/users/:id' , async(req,res) =>{
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


app.patch('/tasks/:id' , async(req, res) =>{
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


////////////////////// DELETING /////////////////////


app.delete ('/users/:id' , async(req, res) =>{
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


app.delete ('/tasks/:id' , async(req, res) =>{
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

app.listen(port , ()=>{
    console.log("server has started on port 3000")
})