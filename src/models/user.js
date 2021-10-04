const mongoose = require('mongoose');
const validator  = require('validator');



const User = mongoose.model('User' ,{
    name: {
         type : String,
         required : true,
         trim : true
     },
     email :{
         type : String,
         trim : true,
         lowercase : true,
         required : true,
         validate(value){
             if (!validator.isEmail(value)){
                 throw new Error ("Invaild Email address");
             }
         }
     },
     password :{
         type : String,
         trim : true,
         required : true,
         // validate(value){
         //     if(value.length < 6 || value === "password"){
         //         throw new Error ("Password must be greter than the 6  letters and password shoud not be password")
         //     }
         // }
         minlength : 7,
         validate(value){
             if(value.toLowerCase().includes("password")){
                 throw new Error ('Password shoud not contain "password"')
             }
         }
     }, 
     age  :{
         type : Number,
         default : 0,
         validate(value){
             if(value < 0){
                 throw new Error ("Age must be in Postitive number")
             }
         }
     }
 });


 module.exports = User