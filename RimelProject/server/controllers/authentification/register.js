const User = require('../../models/user') ; 



const userController = {} ;

userController.register = async(req ,res , next) =>{

try{
  const {pseudo , email , password} = req.body ;

  

//validate

  if(!pseudo || !email || !password)
    res.status(400).json({ msg : "Not all fields have been entered"}) 

  if(pseudo.length<3)
    res.status(400).json({msg :"pseudo should be at least 3 caracter"})



 //check if pseudo is existing
  const pseudoExist = await User.findOne({pseudo : req.body.pseudo}) ;
  if(pseudoExist) 
    res.status(400).json({msg:"An account with this pseudo already exists ."}) ;


  //check if email is existing
  const emailExist = await User.findOne({email : req.body.email}) ;
  if(emailExist) 
    res.status(400).json({msg:"An account with this email already exists ."}) ;

 //crypt password 
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt) ;

  const user = new User({
    pseudo:pseudo,
    email ,
    password : passwordHash  

  }) ;

  const savedUser = await user.save();
    res.status(201).json(savedUser) ;

  }
  catch(err){
    res.status(500).json(err);
 }


}



module.exports = userController ; 