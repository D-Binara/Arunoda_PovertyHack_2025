import { Response } from 'express';
import StoryPack from '../models/StoryPack';
import Story from '../models/Story';
import UserProgress from '../models/UserProgress';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get all story packs
 * @route   GET /api/story-packs
 * @access  Public
 */
export const getStoryPacks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { category, featured } = req.query;

  const filter: any = {};

  if (category) filter.category = category;
  if (featured) filter.featured = featured === 'true';

  const packs = await StoryPack.find(filter).sort({ featured: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: packs.length,
    data: packs,
  });
});

/**
 * @desc    Get single story pack with stories
 * @route   GET /api/story-packs/:id
 * @access  Public
 */
export const getStoryPack = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pack = await StoryPack.findById(req.params.id);

  if (!pack) {
    throw new AppError('Story pack not found', 404);
  }

  const stories = await Story.find({ packId: pack._id });

  res.status(200).json({
    success: true,
    data: {
      pack,
      stories,
    },
  });
});

/**
 * @desc    Get single story
 * @route   GET /api/stories/:id
 * @access  Public
 */
export const getStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const story = await Story.findById(req.params.id).populate('packId');

  if (!story) {
    throw new AppError('Story not found', 404);
  }

  res.status(200).json({
    success: true,
    data: story,
  });
});

/**
 * @desc    Complete a story and update progress
 * @route   POST /api/stories/:id/complete
 * @access  Private
 */
export const completeStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { score } = req.body;
  const storyId = req.params.id;

  const story = await Story.findById(storyId);
  if (!story) {
    throw new AppError('Story not found', 404);
  }

  let progress = await UserProgress.findOne({ userId: req.user._id });

  if (!progress) {
    progress = await UserProgress.create({ userId: req.user._id });
  }

  // Check if already completed
  const alreadyCompleted = progress.completedStories.some(
    (cs: any) => cs.storyId.toString() === storyId
  );

  if (!alreadyCompleted) {
    progress.completedStories.push({
      storyId: story._id,
      completedAt: new Date(),
      score,
    } as any);

    progress.totalStories = progress.completedStories.length;
    progress.experiencePoints += score || 10;
    progress.level = Math.floor(progress.experiencePoints / 100) + 1;

    // Update streak
    const today = new Date();
    const lastActivity = new Date(progress.lastActivityDate);
    const daysDiff = Math.floor(
      (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 1) {
      progress.currentStreak += 1;
    } else if (daysDiff > 1) {
      progress.currentStreak = 1;
    }

    progress.lastActivityDate = today;
    await progress.save();
  }

  res.status(200).json({
    success: true,
    data: progress,
  });
});

/**
 * @desc    Create story pack (Admin only)
 * @route   POST /api/story-packs
 * @access  Private/Admin
 */
export const createStoryPack = asyncHandler(async (req: AuthRequest, res: Response) => {
  const pack = await StoryPack.create(req.body);

  res.status(201).json({
    success: true,
    data: pack,
  });
});

/**
 * @desc    Create story (Admin only)
 * @route   POST /api/stories
 * @access  Private/Admin
 */
export const createStory = asyncHandler(async (req: AuthRequest, res: Response) => {
  const story = await Story.create(req.body);

  res.status(201).json({
    success: true,
    data: story,
  });
});
