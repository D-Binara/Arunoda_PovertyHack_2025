import { Router } from 'express';
import { listEntrepreneurs, getEntrepreneurById } from '../controllers/entrepreneurController';

const router = Router();

// Public endpoints
router.get('/', listEntrepreneurs);
router.get('/:id', getEntrepreneurById);

export default router;
