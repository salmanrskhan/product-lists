let Login = require('../models/login')
const bcrypt = require('bcrypt');

// const addLogin = (req, res) => {
//     console.log(req.body.email)

//     let login = new Login(
//         {
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         })


//     login.save()
//         .then((docs) => {
//             res.json(docs);
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err.message });
//         });

// }

// const addLogin = async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const login = new Login({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         const savedLogin = await login.save();
//         res.status(201).json(savedLogin);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const addLogin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if a user with the same email already exists
        const existingUser = await Login.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this email already exists' });
        }

        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const login = new Login({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        });

        const savedLogin = await login.save();
        res.status(201).json(savedLogin);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// const loginAdmin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await Login.findOne({ email });

//         if (!admin) {
//             return res.status(404).json({ success: false, message: 'user not found' });
//         }
//         if (password !== admin.password) {
//             return res.status(401).json({ success: false, message: 'invalid password' });
//         }

//         return res.status(200).json({ success: true, message: 'login' });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, message: 'internal error' });
//     }
// }

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Login.findOne({ email });

        if (!admin) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        // Include the user's name in the response
        const { _id, name } = admin;
        return res.status(200).json({ success: true, message: 'Login successful', user: { _id, name } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal error' });
    }
}


const getAllLogin = (req, res) => {
    // Login.find((err, docs) => {
    //     if (!err) {
    //         res.json(docs)
    //     }
    //     else {
    //         res.json(err)
    //     }
    // })

    Login.find()
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}

module.exports = { addLogin, getAllLogin, loginAdmin }




// ===================================================

// const mongoose = require('mongoose');
// const Login = require('../models/login'); // Make sure to import your Login model correctly

// const addLogin = (req, res) => {
//     console.log(req.body.name);

//     const { name, email, password } = req.body;

//     const login = new Login({
//         name,
//         email,
//         password,
//     });

//     login.save()
//         .then((docs) => {
//             res.json(docs);
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err.message });
//         });
// };

// module.exports = { addLogin };
