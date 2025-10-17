import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from '../controllers/productController';
import { protect, optionalAuth } from '../middleware/auth';
import { createProductValidation, mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(optionalAuth, createProductValidation, createProduct); // Changed from protect to optionalAuth

router.get('/user/my-products', protect, getMyProducts);

router.route('/:id')
  .get(mongoIdValidation, getProduct)
  .put(protect, mongoIdValidation, updateProduct)
  .delete(protect, mongoIdValidation, deleteProduct);

export default router;
