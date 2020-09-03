const express = require('express');
const router = require("express").Router() ;
const User = require('../models/user') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ; 
const auth = require('../middleware/auth') ;
require('dotenv').config();



router.post('/login', async (req,res) =>{

  try{

    
    const {email,password} = req.body ;
    
    //validate : <-- il faut une validation par express-validation/passport , et msg d validation pr email
    if(!email || !password)
    res.status(400).json({msg :" Not all fields have been entered"}) ;

    //check existing email
    const user = await User.findOne({email :email}) ; 
    if(!user) res.status(400).send("email or password is wrong") 
    console.log(user)
    //check password
    const validpassword = await bcrypt.compare(password , user.password) ; 
    if(!validpassword) res.status(400).send("Invalid") ;
    

    // generate token 
   const  token = jwt.sign({id : user._id} , process.env.TOKEN_SECRET ,{ expiresIn : '5 days'}) ;
   console.log("token is : " +token)
    res.status(200)
      .send({
            token /* ,
            user :{
              id : user._id ,
              pseudo : user.pseudo,
              email:user.email
            }  */ });
  }
  catch(err){
    res.status(500).json({error : err.message}) ;
  }

} ) ; 



router.post('/register',async (req, res) => {
    

    const { pseudo, email, password } = req.body;

    if(!pseudo || !email || !password){
      return res.status(400).json({msg : 'please enter all fields'})
    }
    try {
      let user = await User.findOne({ email });

     /* if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      } */

      if (user) 
      return res.status(400).json({msg : 'user already exist'})


      user = new User({
        pseudo,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const useed = await user.save();

      const  token = jwt.sign({id : useed._id} , process.env.TOKEN_SECRET ,{ expiresIn : '5 days'}) ;
 
        console.log("token is : " +token)
        res.status(200).json({
          token
          /*,
          user : {
            id : useed._id , 
            pseudo : useed.pseudo,
            email : useed.email
          } */
        })



    } catch (err) {
      console.error(err.message);
      res.status(500).json({error:'Server error'});
    }
  }
);

// deplacer vers route user
router.delete('/delete', auth , async (req,res)=>{
  try{
    const deleteUser = await User.findByIdAndDelete(req.user) ;
    res.json(deleteUser) ;
  }
  catch(err){res.status(500).json({error : err.message })}

})



router.get('/user', auth , async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/users',auth, async (req,res)=>{

  console.log(req.body)

  const users =await User.find().exec() 

  res.send(users) ; 
  
})


module.exports = router ;