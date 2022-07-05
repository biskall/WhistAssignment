const express = require('express')
const router = express.Router()
const Stats = require('../controller/stats_controller')

router.post('/addSales', Stats.add);
router.get('/getStats', Stats.getStats);

module.exports = router
