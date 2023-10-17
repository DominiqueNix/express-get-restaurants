const express = require("express");
const app = express();
const {Restaurant }= require("../models/index")
const db = require("../db/connection");
const {Menu} = require("../models/index");
const {Item }= require("../models/index");
const { check,validationResult } = require("express-validator");


//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
    let allRestaurants = await Restaurant.findAll({include: Menu, include:[{model: Menu, include: [{model:Item}]}]});
    res.json(allRestaurants)
})

app.get('/restaurants/:id', async(req, res) => {
    let id = req.params.id
    let oneRestaurant = await Restaurant.findByPk(id);
    res.json(oneRestaurant)
})

app.use(express.json());
app.use(express.urlencoded());

app.post('/restaurants', [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(), 
    check("cuisine").not().isEmpty().trim()
] ,async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    } else {
        let newRestaurant = await Restaurant.create(req.body)
        console.log(newRestaurant)
        res.json(newRestaurant)  
    }
    
})

app.put('/restaurant/:id', async(req,res) => {
    let updatedRestaurant = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(updatedRestaurant)
})

app.delete('/restaurant/:id', async(req,res) => {
    let deletedRestaurant = await Restaurant.destroy({
        where: {id: req.params.id}
    });
    res.json(deletedRestaurant)
})

module.exports = app;