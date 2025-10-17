import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { registerValidation, loginValidation } from '../utils/validators';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
