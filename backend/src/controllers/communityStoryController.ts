import { Response } from 'express';
import CommunityStory from '../models/CommunityStory';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get all community stories
 * @route   GET /api/community-stories
 * @access  Public
 */
export const getCommunityStories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, district, category, featured } = req.query;

  const filter: any = { status: 'approved' };

  if (status && req.user?.role === 'admin') {
    filter.status = status;
  }
  if (district) filter.district = district;
  if (category) filter.category = category;
  if (featured) filter.featured = featured === 'true';

  const stories = await CommunityStory.find(filter)
    .populate('userId', 'name photo')
    .sort({ featured: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: stories.length,
    data: stories,
  });
});

/**
 * @desc    Get single community story
 * @route   GET /api/community-stories/:id
 * @access  Public
 */
export const getCommunityStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const story = await CommunityStory.findById(req.params.id)
    .populate('userId', 'name photo village district');

  if (!story) {
    throw new AppError('Community story not found', 404);
  }

  res.status(200).json({
    success: true,
    data: story,
  });
});

/**
 * @desc    Create community story
 * @route   POST /api/community-stories
 * @access  Private
 */
export const createCommunityStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  req.body.userId = req.user._id;
  req.body.userName = req.user.name;
  req.body.village = req.user.village;
  req.body.district = req.user.district;

  const story = await CommunityStory.create(req.body);

  res.status(201).json({
    success: true,
    data: story,
  });
});

/**
 * @desc    Update community story
 * @route   PUT /api/community-stories/:id
 * @access  Private
 */
export const updateCommunityStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  let story = await CommunityStory.findById(req.params.id);

  if (!story) {
    throw new AppError('Community story not found', 404);
  }

  // Make sure user is story owner or admin
  if (story.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this story', 403);
  }

  story = await CommunityStory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: story,
  });
});

/**
 * @desc    Delete community story
 * @route   DELETE /api/community-stories/:id
 * @access  Private
 */
export const deleteCommunityStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const story = await CommunityStory.findById(req.params.id);

  if (!story) {
    throw new AppError('Community story not found', 404);
  }

  // Make sure user is story owner or admin
  if (story.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to delete this story', 403);
  }

  await story.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc    Approve/Reject community story (Admin only)
 * @route   PUT /api/community-stories/:id/moderate
 * @access  Private/Admin
 */
export const moderateStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, featured } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const story = await CommunityStory.findByIdAndUpdate(
    req.params.id,
    { status, featured },
    { new: true, runValidators: true }
  );

  if (!story) {
    throw new AppError('Community story not found', 404);
  }

  res.status(200).json({
    success: true,
    data: story,
  });
});
