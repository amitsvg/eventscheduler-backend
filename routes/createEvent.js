const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const EVENT = mongoose.model("EVENT");

//Route
router.post("/createEvent", requireLogin, (req, res) => {
    const { title, eventDate } = req.body;
    if (!title || !eventDate) {
        return res.status(422).json({ error: "Please add title and date" })
    }
    console.log(req.user)
    const evt = new EVENT({
        title,
        eventDate,
        completed: false,
        postedBy: req.user
    })
    evt.save()
        .then((evt) => { res.json({ message: "Event created successfully" }) })
        .catch(err => console.log(err));
        // .then((result) => {
        //     return res.json({ event: result });
        // })
})

router.get("/myevents", requireLogin, (req, res) => {
    // console.log(req.user)
    EVENT.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name email")
        .then(myevents => {
            res.json(myevents)
        })
})

router.put("/update", (req, res) => {
    EVENT.findByIdAndUpdate(req.body.eventId, {
        $set : {completed: true}
    })
    .then(result => res.json(result))
    .catch(err => res.status(422).json(err));
})


module.exports = router;