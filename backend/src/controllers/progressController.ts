import { Response } from 'express';
import UserProgress from '../models/UserProgress';
import Badge from '../models/Badge';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get user progress
 * @route   GET /api/progress
 * @access  Private
 */
export const getUserProgress = asyncHandler(async (req: AuthRequest, res: Response) => {
  let progress = await UserProgress.findOne({ userId: req.user._id })
    .populate('badges.badgeId')
    .populate('completedStories.storyId');

  if (!progress) {
    progress = await UserProgress.create({ userId: req.user._id });
  }

  res.status(200).json({
    success: true,
    data: progress,
  });
});

/**
 * @desc    Award badge to user
 * @route   POST /api/progress/badges/:badgeId
 * @access  Private
 */
export const awardBadge = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { badgeId } = req.params;

  const badge = await Badge.findById(badgeId);
  if (!badge) {
    throw new AppError('Badge not found', 404);
  }

  let progress = await UserProgress.findOne({ userId: req.user._id });

  if (!progress) {
    progress = await UserProgress.create({ userId: req.user._id });
  }

  // Check if badge already earned
  const hasBadge = progress.badges.some((b: any) => b.badgeId.toString() === badgeId);

  if (hasBadge) {
    throw new AppError('Badge already earned', 400);
  }

  progress.badges.push({
    badgeId: badge._id,
    unlockedAt: new Date(),
  } as any);

  await progress.save();

  res.status(200).json({
    success: true,
    data: progress,
  });
});

/**
 * @desc    Get all badges
 * @route   GET /api/badges
 * @access  Public
 */
export const getAllBadges = asyncHandler(async (_req: AuthRequest, res: Response) => {
  const badges = await Badge.find().sort({ category: 1, name: 1 });

  res.status(200).json({
    success: true,
    count: badges.length,
    data: badges,
  });
});

/**
 * @desc    Create badge (Admin only)
 * @route   POST /api/badges
 * @access  Private/Admin
 */
export const createBadge = asyncHandler(async (req: AuthRequest, res: Response) => {
  const badge = await Badge.create(req.body);

  res.status(201).json({
    success: true,
    data: badge,
  });
});

/**
 * @desc    Get leaderboard
 * @route   GET /api/progress/leaderboard
 * @access  Public
 */
export const getLeaderboard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { limit = 10 } = req.query;

  const leaderboard = await UserProgress.find()
    .populate('userId', 'name photo village district')
    .sort({ level: -1, experiencePoints: -1 })
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    count: leaderboard.length,
    data: leaderboard,
  });
});
