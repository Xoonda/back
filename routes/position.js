const express = require('express');
const controller = require('../controllers/position')
const router = express.Router()

router.get('./:categoryId', controller.getByCategoryId)
router.post('./', controller.create)
router.patch('./', controller.remove)
router.delete('./analytics', controller.update)

module.exports = router;