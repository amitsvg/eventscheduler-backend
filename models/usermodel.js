const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },    
})


mongoose.model("USER", userSchema)