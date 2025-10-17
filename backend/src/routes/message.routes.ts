import express from 'express';
import {
  getThreads,
  getOrCreateThread,
  getThreadMessages,
  sendMessage,
  markAsRead,
} from '../controllers/messageController';
import { protect } from '../middleware/auth';
import { mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.get('/threads', protect, getThreads);
router.post('/threads', protect, getOrCreateThread);
router.get('/threads/:threadId', protect, mongoIdValidation, getThreadMessages);
router.put('/threads/:threadId/read', protect, mongoIdValidation, markAsRead);

router.post('/', protect, sendMessage);

export default router;
