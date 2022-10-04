const express = require('express');
const billModel = require('../Models/BillsModel');
const router = express.Router()

router.post("/charge-bill",async(req,res) => {
    try{
        const newbill = new billModel(req.body);
        await newbill.save()
        res.send('Amount Charged Successfully');
    } catch(error){
        res.status(400).json(error);
    }

});

router.get("/get-all-bills",async(req,res) => {
    try{
        const bills = await billModel.find();
        res.send(bills);
    } catch(error){
        res.status(400).json(error);
    }

});


module.exports = router