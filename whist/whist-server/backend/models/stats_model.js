const mongoose = require('mongoose')

const SalesSchema = new mongoose.Schema({
    dateString: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    dateNumber: {
      type: Number,
      required: true
    }
})

module.exports = mongoose.model('Sales', SalesSchema)
