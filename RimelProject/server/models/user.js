const mongoose = require('mongoose') ; 
const userSchema = mongoose.Schema({
    pseudo : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String ,
        required : true,
        lowercase: true ,
        index : true ,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    createdAt : {
        type : Date , 
        default : Date.now
    } ,

    role:{
        type: Number ,
        default : 0 
        // 0 : user
        // 55 : admin
        //99999 : administrateur 
    }

    // role & token 
})




module.exports = User = mongoose.model('User' , userSchema) ; 