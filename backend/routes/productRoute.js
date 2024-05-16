const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

const multer = require('multer');

// Set up storage for file uploads using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/product', upload.single('file'), productController.addProduct);

router.get('/product', productController.getAllProduct);

router.get('/product/:id', productController.getProductById);
router.delete('/product/:id', productController.delProduct);

router.put('/product/:id', upload.single('file'), productController.updateProduct);

router.get('/product/search/:name', productController.searchProduct);

module.exports = router;
