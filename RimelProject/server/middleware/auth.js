const jwt = require('jsonwebtoken');

// je vais remplacer ça par passport.js
const auth = (req, res, next) =>{
    try{
      const token = req.header("auth-token") ; 

      //check for token
      if(!token)
        res.status(401).json({msg : "No auth token ,not authorization d"}) ;
    

      //verify token
      const verified = jwt.verify(token , process.env.TOKEN_SECRET)
      if(!verified)
        res.status(401).json({msg :"token verifiacation failer , not authorization"})


        //const user = await User.findById(verified.id)
        //const pseudod = {name :user.pseudo ,email: user.email}

         req.user = verified ; 
         next();
    }

    catch(err){res.status(500).json({error : err.message})}

}

module.exports = auth ; 