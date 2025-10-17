import express from 'express';
import {
  getInvestorRequests,
  getInvestorRequest,
  createInvestorRequest,
  updateInvestorRequest,
  deleteInvestorRequest,
  toggleBookmark,
  getBookmarkedRequests,
} from '../controllers/investorRequestController';
import { protect } from '../middleware/auth';
import { createInvestorRequestValidation, mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.route('/')
  .get(getInvestorRequests)
  .post(protect, createInvestorRequestValidation, createInvestorRequest);

router.get('/user/bookmarks', protect, getBookmarkedRequests);

router.route('/:id')
  .get(mongoIdValidation, getInvestorRequest)
  .put(protect, mongoIdValidation, updateInvestorRequest)
  .delete(protect, mongoIdValidation, deleteInvestorRequest);

router.post('/:id/bookmark', protect, mongoIdValidation, toggleBookmark);

export default router;
