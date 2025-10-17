import express from 'express';
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
} from '../controllers/jobController';
import {
  applyForJob,
  getJobApplications,
  getMyApplications,
  updateApplicationStatus,
} from '../controllers/jobApplicationController';
import { protect } from '../middleware/auth';
import { createJobValidation, mongoIdValidation } from '../utils/validators';

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, createJobValidation, createJob);

router.get('/user/my-jobs', protect, getMyJobs);

router.route('/:id')
  .get(mongoIdValidation, getJob)
  .put(protect, mongoIdValidation, updateJob)
  .delete(protect, mongoIdValidation, deleteJob);

router.post('/:jobId/apply', protect, applyForJob);
router.get('/:jobId/applications', protect, getJobApplications);

// Job applications routes
router.get('/applications/my-applications', protect, getMyApplications);
router.put('/applications/:id/status', protect, updateApplicationStatus);

export default router;
