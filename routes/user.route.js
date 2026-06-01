const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.post('/register', async (req,res)=>{
    try{
    const {name, email, password , role} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: 'all fields are required'})
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: 'user already exists'})
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({name , email, password: passwordHash , role });
   await user.save();
    res.status(201).json({message: 'user registered successfully'})

    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'internal server error'})
    }
})

router.post('/login', async (req, res)=>{
    try{
       const {email, password} = req.body;
       if(!email || !password){
        return res.status(400).json({message: 'all fields aare required'})
       }
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message: 'invalid credentials'})
       }
       const isMatch  = await bcrypt.compare(password, user.password)
       if(!isMatch){
        return res.status(400).json({message: 'invalid credentials'})
       }
       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
       res.status(200).json({message: 'login successful', token})
      
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'internal server error'})
    }

})

// protected route 
router.get('/profile', auth, async (req, res) =>{
    try{
    const user = await User.findById(req.user.id).select('-password');
    if(!user){
        return res.status(404).json({message: 'user not found'})
    }
    res.status(200).json({user})
}catch(err){
    return res.status(500).json({message: 'internal server error'})
}

})

module.exports = router;                            