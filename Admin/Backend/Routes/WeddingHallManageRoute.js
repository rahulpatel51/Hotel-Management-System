const express = require('express');
const { getWeddingHalls, updateWeddingHall, deleteWeddingHall } = require('../Controllers/WeddingHallManageController');
const router = express.Router();

router.get('/', getWeddingHalls);
router.put('/:hallNumber', updateWeddingHall);
router.delete('/:hallNumber', deleteWeddingHall);

module.exports = router;
