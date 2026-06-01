const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const auth = require('../middleware/auth');



// add item  to cart 

router.post('/add', auth, async (req, res) => {
    try {
        const { menuId, quantity } = req.body;
        const userId = req.user.id;

        // menu ka price lo
        const food = await Food.findById(menuId);
        if (!food) return res.status(404).json({ message: 'Food not found' });

        const itemPrice = food.price * quantity;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            cart.items.push({ menuId, quantity });
            cart.totalPrice += itemPrice; // price add karo
        } else {
            cart = new Cart({
                userId,
                items: [{ menuId, quantity }],
                totalPrice: itemPrice
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get cart items 

router.get('/', auth , async (req, res)=>{
    try{
    const cartitems = await Cart.findOne({userId: req.user.id})
    if(!cartitems) {
        return res.status(404).json({message: 'Cart not found'})
    }
    res.status(200).json(cartitems);    
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


// remove item from cart 
router.delete('/remove/:menuId', auth , async (req, res)=>{
try{
    const deleteitem = await Cart.findOne({userId: req.user.id})
    if(!deleteitem){
        return res.status(404).json({message: 'Item not found in cart'})
    }
    deleteitem.items = deleteitem.items.filter(item => item.menuId.toString() !== req.params.menuId)
    await deleteitem.save()
    res.status(200).json({message: 'Item removed from cart',  deleteitem})
}catch(error){
    res.status(500).json({message: error.message})
}
})

// DELETE — poora cart clear karo
router.delete('/clear', auth, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user.id });
        res.status(200).json({ message: 'Cart clear ho gaya' });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;