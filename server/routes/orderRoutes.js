const router = require('express').Router();
const { protect , isAdmin } = require('./../middlewares/protect');
const orderController = require('./../controllers/orderController');

router.route('/all').get(protect , isAdmin , orderController.getAllOrders);
router.route('/myOrders').get(protect , orderController.getMyOrders);
router.route('/new').post( protect , orderController.createOrder)
router.route('/:id')
   .get(protect , orderController.getSingleOrder)
   .put(protect , isAdmin , orderController.updateOrder)
   .delete(protect , isAdmin , orderController.deleteOrder)


module.exports = router;