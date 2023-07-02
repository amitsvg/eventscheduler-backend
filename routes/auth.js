const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middlewares/requireLogin');

// router.get('/', (req, res) => {
//     res.send("Hellio ojej")
// })




router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(422).json({ error: "Please add all the fields" })
    }
    USER.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ eroor: "User already exist with that email" })
            }
            bcrypt.hash(password, 12, (err, hashedPassword) => {
                const newuser = new USER({
                    name,
                    email,
                    password: hashedPassword
                })

                newuser.save()
                    .then((newuser) => { res.json({ meassage: `saved successfully as ${newuser.name}` }) })
                    .catch(err => { console.log(err) })

            })


        })



})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ eroor: "Please add Email and Password" });
    }

    USER.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ Error: "Invalid email" })
            }
            bcrypt.compare(password, savedUser.password)
                .then((match) => {
                    if (match) {
                        // return res.status(200).json({ message: "Signed in successfully" })
                        const jtoken = jwt.sign({_id: savedUser.id}, process.env.JWT_SECRET);
                        res.status(200).json(jtoken);

                    } else {

                        return res.status(422).json({ error: "Invalid password" })
                    }
                })
                .catch(err => { console.log(err) })
        })
})

module.exports = router;