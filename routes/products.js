const { Router } = require('express');
const productsController = require('../controllers/productsController');

const router = Router();

router.get('/:id', productsController.findById);
router.post('/', productsController.create);
router.get('/', productsController.getAll);

module.exports = router;