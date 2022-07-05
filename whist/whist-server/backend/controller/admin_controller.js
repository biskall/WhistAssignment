const Product = require('../models/admin_model')

const getProducts = (req,res,next)=>{
  Product.find().then(documents =>{
    res.status(200).json({
      message : 'posts fetched successfully',
      products : documents
    });
  });
}


const add = (req, res, next) => {
  const product = new Product({
      description: req.body.description,
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      sold : req.body.sold,
      unique : req.body.unique
  });
  product.save().then((result) => {
          res.status(201).json({
              message: "recommendation was sent",
              productId : result.id
          });
      }),
      (err) => {
          return res.status(401).send({
              status: "failed",
              error: "failed to add recommendation",
          });
      }
}

const editProduct = (req, res)=>{
  Product.updateOne({
    _id: req.body.id,
  }, {
    $set: {
      description: req.body.description,
      title: req.body.title,
      price: req.body.price,
      image: req.body.image,
      sold : req.body.sold,
      unique : req.body.unique
    }
    }).then(result =>{
    res.status(200).json({
      message : 'posts updeted successfully',
    });
   })
}

const deleteProduct = (req, res, next) => {
  Product.deleteOne({
    _id: req.params.id,
  }).then(result => {
      res.status(200).json({
        message: "Delete succesfully."
      })
  })
}

module.exports = {
  add,
  getProducts,
  editProduct,
  deleteProduct
};
