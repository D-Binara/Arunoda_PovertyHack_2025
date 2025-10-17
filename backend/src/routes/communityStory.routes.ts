import express from 'express';
import {
  getCommunityStories,
  getCommunityStory,
  createCommunityStory,
  updateCommunityStory,
  deleteCommunityStory,
  moderateStory,
} from '../controllers/communityStoryController';
import { protect, authorize } from '../middleware/auth';
import { mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.route('/')
  .get(getCommunityStories)
  .post(protect, createCommunityStory);

router.route('/:id')
  .get(mongoIdValidation, getCommunityStory)
  .put(protect, mongoIdValidation, updateCommunityStory)
  .delete(protect, mongoIdValidation, deleteCommunityStory);

router.put('/:id/moderate', protect, authorize('admin', 'moderator'), mongoIdValidation, moderateStory);

export default router;
