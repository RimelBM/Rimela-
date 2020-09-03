const express = require('express');
const router = require("express").Router() ;
const Food = require('../models/food') ;
const auth = require('../middleware/auth') ;
const User = require('../models/user')
require('dotenv').config();


//Get All foods

router.get('/' ,async (req,res)=>{

    try{
        const Foods =  await Food.find().sort({ createdAt: -1 })
        res.status(200).send(Foods) ;
    } catch(err){
        console.error(err) ;
        res.status(400).json({msg : err.message})
    }

})

//create a food

router.post('/', auth, async(req,res)=>{
    try{

     const user = await User.findById(req.user.id).select('-password');
     console.log(user)
     const newFood = Food({
        description : req.body.description ,
        picture : req.body.picture ,
        pseudo : user.pseudo ,
        user: req.user.id
     //   user : req.res.user.name
     })

     const food = await newFood.save() ;
     res.json(food);
     //console.log(req.res.user.name)


    } catch(err){
        res.send({ msg : err.message})
    }
    
})

//Delete a food 

router.delete('/:id', auth , async(req,res)=>{
    try{
     
     const deleted = await Food.findById(req.params.id) ;


     if(!deleted){

        res.send({success : false})

     }
     console.log(req.user)

     if(deleted.user !== req.user.id)
     {
        return res.status(400).json({success : false})
     }

     await deleted.remove();

     res.send({success : true});



    } catch(err){
        console.error(err) ;
    }
    
})

router.post('/like/:id', auth ,async(req,res) =>{

    try{

      if(!req.user.id){
        return res.send('error in authorization')
      }

        const useer = await User.findById(req.user.id).select('-password');

        const post = await Food.findById(req.params.id);
       
        if (!post) {
			return res.status(404).send({ msg: 'Post not found' })
        }
        
   //     if (post.likes.some(like => like.pseudo === useer.pseudo)) {
		//	return res.status(400).json({ msg: 'User already liked this post' })
		// }
   

        post.likes.unshift({ user: req.user.id ,pseudo:useer.pseudo});

        await post.save() ;

        res.json(post) 
          
    } catch (err) {

      console.error(err.message)
        res.status(500).send({msg :'Server Error id'});

    }


})


router.put('/unlike/:id', auth, async (req, res) => {

    try {

        const useer = await User.findById(req.user.id).select('-password');
    
        const post = await Food.findById(req.params.id);

        if (!post) {
			return res.status(404).send({ msg: 'Post not found' })
        }
        
  
      // Check if the post has not yet been liked
        if (!post.likes.some(like => like.pseudo === useer.pseudo)) {
           return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
  
      // remove the like
        post.likes = post.likes.filter(
        (like) => like.pseudo !== useer.pseudo
       );
  
      await post.save();
  
      return res.json(post.likes);

    } catch (err) {
      
        res.status(500).send('Server Error');
    }
  });



  router.post('/comment/:id',auth,async (req, res) => {
      
        try {

        const user = await User.findById(req.user.id).select('-password');
        
        const post = await Food.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          pseudo: user.pseudo,
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      
    } catch (err) {
      
        res.status(500).send('Server Error');
      }
    }
  );

  router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

    try {

      const post = await Food.findById(req.params.id);
  
      
      if(!post) return res.status(400).json({msg:"post not found"}) ;

      const comment = post.comments.find(
        comment =>  comment.id === req.params.comment_id
      );

      // Make sure comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist' });
      }
      // Check user
      if (comment.user !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
      );
  
      await post.save();
  
      return res.json(post.comments);

    } catch (err) {
      
        return res.status(500).send('Server Error');
    }
  });
  



  

module.exports = router ;