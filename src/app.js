const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
    let allRestaurants = await Restaurant.findAll();
    res.json(allRestaurants)
})

app.get('/restaurants/:id', async(req, res) => {
    let id = req.params.id
    let oneRestaurant = await Restaurant.findByPk(id);
    res.json(oneRestaurant)
})

module.exports = app;