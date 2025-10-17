import { Response } from 'express';
import { validationResult } from 'express-validator';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get all jobs
 * @route   GET /api/jobs
 * @access  Public
 */
export const getJobs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, district, search } = req.query;

  const filter: any = {};

  if (status) filter.status = status;
  if (district) filter.district = district;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const jobs = await Job.find(filter)
    .populate('postedBy', 'name photo village district contactPrefs')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});

/**
 * @desc    Get single job
 * @route   GET /api/jobs/:id
 * @access  Public
 */
export const getJob = asyncHandler(async (req: AuthRequest, res: Response) => {
  const job = await Job.findById(req.params.id)
    .populate('postedBy', 'name photo village district contactPrefs');

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Create job
 * @route   POST /api/jobs
 * @access  Private
 */
export const createJob = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  req.body.postedBy = req.user._id;

  const job = await Job.create(req.body);

  res.status(201).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Update job
 * @route   PUT /api/jobs/:id
 * @access  Private
 */
export const updateJob = asyncHandler(async (req: AuthRequest, res: Response) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  // Make sure user is job poster
  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update this job', 403);
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: job,
  });
});

/**
 * @desc    Delete job
 * @route   DELETE /api/jobs/:id
 * @access  Private
 */
export const deleteJob = asyncHandler(async (req: AuthRequest, res: Response) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  // Make sure user is job poster
  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to delete this job', 403);
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

/**
 * @desc    Get user's posted jobs
 * @route   GET /api/jobs/user/my-jobs
 * @access  Private
 */
export const getMyJobs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});
