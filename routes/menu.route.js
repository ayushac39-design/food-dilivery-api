const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Food = require('../models/menu.model');


// create a new food item
router.post('/add', auth ,async (req , res)=> {
    try {
      const {name , price , description , restaurantId} = req.body;
      const newFood = new Food({name , price , description , restaurantId});
      await newFood.save();
      res.status(201).json(newFood);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})

// get all food items

 router.get('/all/restaurant/:restaurantId', async (req , res) => {
    try {
      const foods = await Food.find({ restaurantId: req.params.restaurantId });
      if(!foods){
        res.status(404).json({message: 'No food items found for this restaurant'})
    }   
    }catch (error){
            res.status(500).json({message: 'Internal Server Error'})
    }
    })


// get a food item by id 
router.get('/:id', async (req, res)=>{
    try{
        const food = await Food.findById(req.params.id);
        if(!food){
            res.status(404).json({message: 'Food item not found'})
        }
        res.status(200).json(food);
   
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'})
    }
})

//update a food item by id 

router.put('/:id', auth, async (req, res)=>{
    try{
  const updatedFood = await Food.findByIdAndUpdate(req.params.id , req.body, {new: true} )
  if(!updatedFood){
    return res.status(404).json({message: 'Food item not found'})
  }
  res.status(200).json(updatedFood);        
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'})
    }
})


// delete a food item by id 
router.delete('/:id', auth , async ( req, res)=>{
    try{
         const deletedfood = await Food.findByIdAndDelete(req.params.id);
         if(!deletedfood){
            return res.status(404).json({message: 'Food item not found'})
         }              
            res.status(200).json({message: 'Food item deleted successfully'})  
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'})
    }
})

module.exports = router;