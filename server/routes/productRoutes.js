const router = require('express').Router();
const productController = require('./../controllers/productController');
const { protect , isAdmin } = require('./../middlewares/protect');

router.route('/new').post(protect , isAdmin , productController.createProduct);
router.route('/new/images/:id').post(protect , isAdmin , productController.addProductImages);
router.route('/all').get(productController.getAllProducts);
router.route('/admin/all').get(protect , isAdmin , productController.getAllAdminProducts);
router.route('/:id')
   .get(productController.getSingleProduct)
   .put(protect , isAdmin , productController.updateProduct)
   .delete(protect , isAdmin , productController.deleteProduct)

module.exports = router;