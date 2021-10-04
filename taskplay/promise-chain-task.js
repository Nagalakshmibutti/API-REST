require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('61540ec76a7301801d87864c').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed : false})
// }).then((count)=>{
//     console.log(count)
// }).catch((e) =>{
//     console.log(e)
// });


 const deleteFunction = async(id) =>{
     
         const task  = await Task.findByIdAndDelete(id);
         const count = await Task.countDocuments({completed : false})
         return count
    
 }

deleteFunction('615aa922acc8e6afc3eda020').then((count) =>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})