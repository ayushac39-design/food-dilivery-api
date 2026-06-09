const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const auth = require("../middleware/auth");
const Order = require("../models/order.model");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Recommendation Route
router.get("/recommend", auth, async (req, res) => {
  try {
    // User ke past orders nikal lo
    const orders = await Order.find({ userId: req.user.id }).populate("items.menuId");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No past orders found" });
    }

    // Past dishes ka list banao
    const pastDishes = orders
      .map(order => order.items.map(item => item.menuId.name))
      .flat()
      .join(", ");

    // AI se recommendation lo
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a food recommendation assistant." },
        { role: "user", content: `User has ordered: ${pastDishes}. Suggest 2 new dishes.` }
      ],
    });

    res.json({ recommendations: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
