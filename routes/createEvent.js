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
        postedBy: req.user
    })
    evt.save()
        .then((result) => {
            return res.json({ event: result });
        })
        .catch(err => console.log(err));
})

router.get("/myevents", requireLogin, (req, res) => {
    // console.log(req.user)
    EVENT.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name email")
        .then(myevents => {
            res.json(myevents)
        })
})


module.exports = router;