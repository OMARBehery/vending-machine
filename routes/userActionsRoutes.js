const { Router } = require('express');
const userActionsController = require('../controllers/userActionsController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();

router.put('/deposit', requireAuth,userActionsController.buyer_deposit);

router.put('/reset', requireAuth,userActionsController.buyer_reset);


//take amount and product id
router.post('/buy',requireAuth,userActionsController.buy_get);

// router.put('/updateuser',requireAuth,userActionsController.user_update);



// router.delete('/:userid',requireAuth,userActionsController.user_delete);

module.exports = router;