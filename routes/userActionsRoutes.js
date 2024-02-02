const { Router } = require('express');
const actionsController = require('../controllers/userActionsController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.put('/deposit', requireAuth,userActionsController.buyer_deposit);

router.put('/reset', requireAuth,userActionsproductController.buyer_reset);


//take amount and product id
router.get('/buy',requireAuth,userActionsproductController.buy_get);

router.put('/updateuser',requireAuth,userActionsproductController.user_update);



router.delete('/:userid',requireAuth,userActionsproductController.user_delete);

module.exports = router;