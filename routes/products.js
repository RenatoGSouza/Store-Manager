const { Router } = require('express');
const productsController = require('../controllers/productsController');

const router = Router();

router.get('/:id', productsController.findById);
router.put('/:id', productsController.update);
router.post('/', productsController.create);
router.get('/', productsController.getAll);
router.delete('/:id', productsController.remove);

module.exports = router;