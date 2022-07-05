const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sold: {
      type: Number,
      required: true
    },
    unique: {
      type: Number,
      required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)
