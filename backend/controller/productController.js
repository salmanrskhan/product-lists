const Product = require('../models/product');
const path = require('path');

const addProduct = (req, res) => {
  const { name, price, descp } = req.body;
  const file = req.file;

  const product = new Product({
    name,
    file: file ? path.join('uploads', file.filename) : '', // Save the file path
    price,
    descp,
  });

  product
    .save()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const getAllProduct = (req, res) => {
  Product.find()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((docs) => {
      if (docs) {
        res.json(docs);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

const delProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((docs) => {
      if (docs) {
        res.json(docs);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

const updateProduct = (req, res) => {
  const productId = req.params.id;
  const file = req.file; 
  const updateData = {
    name: req.body.name,
    price: req.body.price,
    descp: req.body.descp,
  };

  if (file) {
    updateData.file = path.join('uploads', file.filename);
  }

  Product.findByIdAndUpdate(productId, updateData, { new: true })
    .then((docs) => {
      if (docs) {
        res.json(docs);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Fail to update' });
    });
}


const searchProduct = (req, res) => {
  const name = req.params.name;

  Product.find({ name: { $regex: name, $options: 'i' } })
    .then((docs) => {
      if (docs.length > 0) {
        res.json(docs);
      } else {
        res.status(404).json({ error: 'No products found matching the search query.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};


module.exports = { addProduct, getAllProduct, getProductById, delProduct, updateProduct, searchProduct };


