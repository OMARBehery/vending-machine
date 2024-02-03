const { Router } = require('express');
const productController = require('../controllers/productController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.get('/getproducts',requireAuth, productController.allproduct_get);

router.post('/create-product',requireAuth, productController.product_post);
router.put('/productupdate',requireAuth, productController.product_put);
router.delete('/:id',requireAuth, productController.product_delete);

router.get('/:id',requireAuth, productController.singleproduct_get);

module.exports = router;