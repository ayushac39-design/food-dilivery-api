# Food Delivery API 🍕

A REST API for food delivery built with Node.js, Express.js and MongoDB.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Features
- User Register/Login
- JWT Protected Routes
- Restaurant Management
- Food/Menu Management
- Cart System
- Order Management
- AI Integration → Personalized dish recommendations based on past orders (OpenAI API)

## Setup
1. Clone the repo
2. npm install
3. Create .env file , OPENAI_API_KEY
4. Create .gitignore file
5. node server.js

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/profile
- POST /api/restaurants/add
- GET  /api/restaurants/all
- POST /api/food/add
- POST /api/cart/add
- POST /api/orders/place

## AI
1. GET /api/ai/recommend → Suggests dishes using AI
