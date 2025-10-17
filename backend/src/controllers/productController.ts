import { Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category, district, status, search } = req.query;

  const filter: any = {};

  if (category) filter.category = category;
  if (district) filter.district = district;
  if (status) filter.status = status;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const products = await Product.find(filter)
    .populate('userId', 'name photo village district contactPrefs')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id)
    .populate('userId', 'name photo village district contactPrefs');

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Create product
 * @route   POST /api/products
 * @access  Public (for testing, normally Private)
 */
export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  // If no user is authenticated, use the first user from seed data (Nimal)
  if (!req.user) {
    const User = require('../models/User').default;
    const defaultUser = await User.findOne({ email: 'nimal@example.com' });
    if (defaultUser) {
      req.body.userId = defaultUser._id;
    } else {
      throw new AppError('No user found. Please run seed script first.', 400);
    }
  } else {
    req.body.userId = req.user._id;
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
    message: 'Product created successfully',
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private
 */
export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Make sure user is product owner
  if (product.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this product', 403);
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  // Make sure user is product owner
  if (product.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to delete this product', 403);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc    Get user's products
 * @route   GET /api/products/user/my-products
 * @access  Private
 */
export const getMyProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const products = await Product.find({ userId: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});
