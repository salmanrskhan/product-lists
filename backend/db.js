const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

// new mongodb not use call backs
// mongoose.connect('mongodb+srv://salmanrskhan:*****@cluster0.cfh6geb.mongodb.net/ecomm',
//     (err, docs) => {
//         if (!err) {
//             console.log("database connected")
//         }
//         else {
//             console.log(err)
//         }
//     })

mongoose.connect('mongodb+srv://salmanrskhan:$Mongo%402705@cluster0.cfh6geb.mongodb.net/ecomm', 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
).then(() => {
    console.log("Database connected successfull");
}).catch((err) => {
    console.error("Error connecting to the database:", err);
});

module.exports = { mongoose }