import { body, param, ValidationChain } from 'express-validator';

/**
 * Validation rules for user registration
 */
export const registerValidation: ValidationChain[] = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('village').trim().notEmpty().withMessage('Village is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
];

/**
 * Validation rules for login
 */
export const loginValidation: ValidationChain[] = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

/**
 * Validation rules for product creation
 */
export const createProductValidation: ValidationChain[] = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').notEmpty().withMessage('Price is required'),
  body('category')
    .isIn(['food', 'crafts', 'services'])
    .withMessage('Invalid category'),
  body('village').trim().notEmpty().withMessage('Village is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
];

/**
 * Validation rules for job creation
 */
export const createJobValidation: ValidationChain[] = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('pay').trim().notEmpty().withMessage('Pay information is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
];

/**
 * Validation rules for investor request
 */
export const createInvestorRequestValidation: ValidationChain[] = [
  body('userName').trim().notEmpty().withMessage('User name is required'),
  body('village').trim().notEmpty().withMessage('Village is required'),
  body('district').trim().notEmpty().withMessage('District is required'),
  body('category')
    .isIn(['food', 'crafts', 'services'])
    .withMessage('Invalid category'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('purpose').trim().notEmpty().withMessage('Purpose is required'),
  body('roiDescription').trim().notEmpty().withMessage('ROI description is required'),
  body('timeline').trim().notEmpty().withMessage('Timeline is required'),
];

/**
 * Validation rules for MongoDB ObjectId
 */
export const mongoIdValidation: ValidationChain[] = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];
