require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');
const { countDocuments } = require('../src/models/user');

User.findByIdAndUpdate('61555a242ab8fccefa5067d8', {age : 1}).then((user) =>{
    console.log(user)
    return User.countDocuments({age : 1}) 
}).then((count) =>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})