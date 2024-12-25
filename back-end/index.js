const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PatientModel = require('./models/patient')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/patient")

app.post('/register', (req, res) => {
    PatientModel.create(req.body
        .then(patients => res.json(patients))
        .catch(err => res.json(err))
    )
})


app.listen(3001, () => {
    console.log("Server is running")
})