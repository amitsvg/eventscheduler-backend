const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
})

mongoose.model("EVENT", eventSchema)