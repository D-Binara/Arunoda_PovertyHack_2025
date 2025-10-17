import express from 'express';
import {
  getStoryPacks,
  getStoryPack,
  getStory,
  completeStory,
  createStoryPack,
  createStory,
} from '../controllers/storyPackController';
import { protect, authorize } from '../middleware/auth';
import { mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.route('/packs')
  .get(getStoryPacks)
  .post(protect, authorize('admin'), createStoryPack);

router.get('/packs/:id', mongoIdValidation, getStoryPack);

router.route('/')
  .post(protect, authorize('admin'), createStory);

router.get('/:id', mongoIdValidation, getStory);
router.post('/:id/complete', protect, mongoIdValidation, completeStory);

export default router;
