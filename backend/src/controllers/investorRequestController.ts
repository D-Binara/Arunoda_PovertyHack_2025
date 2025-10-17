import { Response } from 'express';
import { validationResult } from 'express-validator';
import InvestorRequest from '../models/InvestorRequest';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get all investor requests
 * @route   GET /api/investor-requests
 * @access  Public
 */
export const getInvestorRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, district, category, maxAmount, featured } = req.query;

  const filter: any = {};

  if (status) filter.status = status;
  if (district) filter.district = district;
  if (category) filter.category = category;
  if (maxAmount) filter.amount = { $lte: Number(maxAmount) };
  if (featured) filter.featured = featured === 'true';

  const requests = await InvestorRequest.find(filter)
    .populate('userId', 'name photo village district contactPrefs')
    .sort({ featured: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: requests.length,
    data: requests,
  });
});

/**
 * @desc    Get single investor request
 * @route   GET /api/investor-requests/:id
 * @access  Public
 */
export const getInvestorRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const request = await InvestorRequest.findById(req.params.id)
    .populate('userId', 'name photo village district contactPrefs bio skills');

  if (!request) {
    throw new AppError('Investor request not found', 404);
  }

  res.status(200).json({
    success: true,
    data: request,
  });
});

/**
 * @desc    Create investor request
 * @route   POST /api/investor-requests
 * @access  Private
 */
export const createInvestorRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  req.body.userId = req.user._id;
  req.body.userName = req.user.name;

  const request = await InvestorRequest.create(req.body);

  res.status(201).json({
    success: true,
    data: request,
  });
});

/**
 * @desc    Update investor request
 * @route   PUT /api/investor-requests/:id
 * @access  Private
 */
export const updateInvestorRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  let request = await InvestorRequest.findById(req.params.id);

  if (!request) {
    throw new AppError('Investor request not found', 404);
  }

  // Make sure user is request owner
  if (request.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this request', 403);
  }

  request = await InvestorRequest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: request,
  });
});

/**
 * @desc    Delete investor request
 * @route   DELETE /api/investor-requests/:id
 * @access  Private
 */
export const deleteInvestorRequest = asyncHandler(async (req: AuthRequest, res: Response) => {
  const request = await InvestorRequest.findById(req.params.id);

  if (!request) {
    throw new AppError('Investor request not found', 404);
  }

  // Make sure user is request owner
  if (request.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to delete this request', 403);
  }

  await request.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc    Toggle bookmark on investor request
 * @route   POST /api/investor-requests/:id/bookmark
 * @access  Private
 */
export const toggleBookmark = asyncHandler(async (req: AuthRequest, res: Response) => {
  const request = await InvestorRequest.findById(req.params.id);

  if (!request) {
    throw new AppError('Investor request not found', 404);
  }

  const userId = req.user._id;
  const bookmarkIndex = request.bookmarkedBy.findIndex(
    (id) => id.toString() === userId.toString()
  );

  if (bookmarkIndex > -1) {
    // Remove bookmark
    request.bookmarkedBy.splice(bookmarkIndex, 1);
  } else {
    // Add bookmark
    request.bookmarkedBy.push(userId);
  }

  await request.save();

  res.status(200).json({
    success: true,
    data: request,
  });
});

/**
 * @desc    Get user's bookmarked requests
 * @route   GET /api/investor-requests/user/bookmarks
 * @access  Private
 */
export const getBookmarkedRequests = asyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await InvestorRequest.find({
    bookmarkedBy: req.user._id,
  })
    .populate('userId', 'name photo village district')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: requests.length,
    data: requests,
  });
});
