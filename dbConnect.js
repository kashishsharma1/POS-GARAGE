const mongoose = require('mongoose')

const URL = 'mongodb+srv://KashishSharma:mongoDB%40database@cluster0.iaqhqij.mongodb.net/client-garage'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected',() =>{
    console.log('MongoDB Connection Successfull')
})

connectionObj.on('error',() => {
    console.log("MongoDB Connection failed")
})