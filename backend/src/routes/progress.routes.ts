import express from 'express';
import {
  getUserProgress,
  awardBadge,
  getAllBadges,
  createBadge,
  getLeaderboard,
} from '../controllers/progressController';
import { protect, authorize } from '../middleware/auth';
import { mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.get('/', protect, getUserProgress);
router.post('/badges/:badgeId', protect, mongoIdValidation, awardBadge);
router.get('/leaderboard', getLeaderboard);

// Badge management
router.route('/badges')
  .get(getAllBadges)
  .post(protect, authorize('admin'), createBadge);

export default router;
