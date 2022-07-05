const express = require('express')
const router = express.Router()
const Admin = require('../controller/admin_controller')

router.post('/add', Admin.add);
router.get('/products', Admin.getProducts);
router.post('/edit', Admin.editProduct);
router.delete('/delete/:id', Admin.deleteProduct);

module.exports = router
