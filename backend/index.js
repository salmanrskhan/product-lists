const express = require('express');
const mongoose = require('./db')
const Router = express.Router()
const loginRoute = require('./routes/loginRoute')
const productRoute = require('./routes/productRoute')

const bodyParser = require('body-parser')
const cors = require('cors');


const app = express();

app.use(bodyParser.json())

app.use(cors({ origin: "*" }));

app.use('/uploads', express.static('uploads'));

app.use('/', loginRoute)
app.use('/', productRoute)

app.use("/", (req, res) => {
    res.send("live")
})

const PORT = process.env.PORT || 4500

// app.get("/", async (req, res) => {
//     res.send("get response at 4500");
// })


app.listen(PORT, () => {
    console.log("server is live at, " + PORT)
})














// package.json
// "scripts": {
//     "start": "index.js",
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "dev": "nodemon index.js"
//   }