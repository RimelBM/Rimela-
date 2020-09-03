const mongoose = require('mongoose');
require('dotenv').config();


const db = process.env.MONGO_DB ;

const connectDB = async ()=>{

    try{
        await mongoose.connect( db ,
            {useNewUrlParser:true ,
             useUnifiedTopology: true,
             useCreateIndex:true
            })

            console.log("connection success") ; 

        /* mongoose.connection.on('connected' ,()=>{
             console.log("mongoose connected to db")
         })

         mongoose.connection.on('error',(err)=>{
             console.log(err.message)
         })

         mongoose.connection.on('disconnected' , ()=>{
             console.log('mongoose connection is disconnected')
         }) */
    }
    catch(err){
           
            console.error(err)
    }
}




module.exports = connectDB