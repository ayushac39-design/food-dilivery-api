require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose")
const authRoutes = require('./routes/user.route');
const restaurantRoutes = require('./routes/resturent.route');
const foodRoutes = require('./routes/menu.route');
const orderRoutes = require('./routes/oder.routes');
const cartRoutes = require('./routes/cart.routes');
const aiRoutes = require('./routes/ai.route');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/ai', aiRoutes);

const logger = (req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(logger);

mongoose.connect(process.env.MONGO_URI) 
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.error("Error connecting to MongoDB", err) }); 


//404 error handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

//Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
}); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
