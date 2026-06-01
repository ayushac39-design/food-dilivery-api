const express = require('express');
const router = express.Router();
const restaurant = require('../models/resturent.model');
const auth = require('../middleware/auth');

// add restaurant ;
router.post('/add',auth,  async (req, res)=>{
    try{
       const {name, address , cusine, menu } = req.body;
       const owner = req.user.id;
    if(!name || !address || !cusine ){
        return res.status(400).json({message: 'all fields are required'})
    }
    const existingRestaurant = await restaurant.findOne({name})
    if(existingRestaurant){
        return res.status(400).json({message: 'Restaurant already exists'})
    }
     const restaurantData = await restaurant.create({name, address , cusine, menu , owner})
      await restaurantData.save();
     res.status(201).json({message: 'Restaurant added successfully'})
    }catch(err){
      console.error(err); 
        res.status(500).json({message: 'Internal Server Error'})
    }
})

// get all restaurant 
  
router.get('/all', async (req, res)=>{
  try{
    const restaurants = await restaurant.find();
    res.status(200).json(restaurants)   
  }catch(err){
    res.status(500).json({message: 'Internal Server Error'})    
  }
})

// get restaurant by id

router.get('/:id', async (req, res)=>{
    try{
      const restaurantId = await restaurant.findById(req.params.id);
      if(!restaurantId){
        return res.status(404).json({message: 'Restaurant not found'})
      }
      res.status(200).json(restaurantId)
    }catch(err){
        res.status(500).json({message: 'Internal Server Error'})
    }
})

// update restaurant by id

router.put('/:id', auth ,  async (req, res)=>{
  try{
    const update = await restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!update){
      return res.status(404).json({message: 'restaurant not found'})
    }
    res.status(200).json({message: 'restaurant updated successfully'})
  }catch(err){
    res.status(500).json({message: 'Internal Server Error'})
  }
})

//delte restaurant by id

router.delete('/:id',auth, async (req, res)=>{
  try{
   const deleteres = await restaurant.findByIdAndDelete(req.params.id);
    if(!deleteres){    
      return res.status(404).json({message: 'restaurant not found'})
    }
    res.status(200).json({message: 'restaurant deleted successfully'})  
}catch(err){
    res.status(500).json({message: 'Internal Server Error'})
}
})


module.exports = router;