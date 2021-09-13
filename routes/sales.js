const { Router } = require('express');
const salesController = require('../controllers/salesController');

const router = Router();

router.get('/:id', salesController.findById);
// router.put('/:id', salesController.update);
router.post('/', salesController.create);
router.get('/', salesController.getAll);
// router.delete('/:id', salesController.remove);

module.exports = router;