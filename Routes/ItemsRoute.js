const express = require('express');
const itemModel = require('../Models/ItemsModel');
const router = express.Router()

router.get("/get-all-items",async(req,res) => {
    try{
        const items = await itemModel.find();
        res.send(items);
    } catch(error){
        res.status(400).json(error);
    }

});

router.post("/add-item",async(req,res) => {
    try{
        const newitem = new itemModel(req.body);
        await newitem.save()
        res.send("Item added successfully!");
    } catch(error){
        res.status(400).json(error);
    }

});

router.post("/edit-item",async(req,res) => {
    try{
        
        await itemModel.findOneAndUpdate({_id : req.body.itemId}, req.body)
        res.send("Item edited successfully!");
    } catch(error){
        res.status(400).json(error);
    }

});

router.post("/delete-item",async(req,res) => {
    try{
        await itemModel.findOneAndDelete({_id : req.body.itemId}, req.body)
        res.send("Item deleted successfully!");
    } catch(error){
        res.status(400).json(error);
    }

});

module.exports = router