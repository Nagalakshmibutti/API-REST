const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Task-app', {useNewUrlParser: true,  useUnifiedTopology : true});




// const per1 = new User({
//     name : '               Nagalakshmibutti                   ',
//     email : "12@EMAIL.COM",
//     password : "jhkgjhhg12367"

// });

// per1.save().then(() =>{
//     console.log(per1)
// }).catch((error)=>{
//     console.log(error)
// })


 
//  const task1 = new Task({
//      description : 'reading novel',
//      completed : false
//  });
 
//  task1.save().then(() =>{
//      console.log(task1)
//  }).catch((error)=>{
//      console.log(error)
//  })