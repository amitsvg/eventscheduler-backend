const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')

app.use(cors());
app.use(morgan('dev'));

require('./models/usermodel');
require('./models/event');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/createEvent'));



// app.get('/', (req, res) => {
//     res.json("hello to my server");
// })



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectDB().then(() => {

    app.listen(process.env.PORT, () => {
        console.log(`server is now running on ${process.env.PORT}`);
    })

})