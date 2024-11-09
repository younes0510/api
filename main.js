const express = require('express')
const mongoose = require('mongoose')

require("dotenv").config()


const User = require("./models/User")
const app =express()
app.use(express.json())

app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  app.post('/api/users', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    });
  
    try {
      const newUser = await user.save(); 
      res.status(201).json(newUser); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  app.put('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.age = req.body.age || user.age;
  
      const updatedUser = await user.save(); 
      res.json(updatedUser); 
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  app.delete("/api/users/:id", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

mongoose.connect('mongodb://127.0.0.1:27017/user');
 app.listen(3000, () => console.log('Server started on: http://localhost:3000'));