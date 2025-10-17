import { Response } from 'express';
import JobApplication from '../models/JobApplication';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Apply for a job
 * @route   POST /api/jobs/:jobId/apply
 * @access  Private
 */
export const applyForJob = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { jobId } = req.params;
  const { message, audioMessage } = req.body;

  // Validate that at least one form of message is provided
  if (!message && !audioMessage) {
    throw new AppError('Please provide either a text message or audio message', 400);
  }

  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError('Job not found', 404);
  }

  if (job.status === 'filled') {
    throw new AppError('This job position has been filled', 400);
  }

  // Check if already applied
  const existingApplication = await JobApplication.findOne({
    jobId,
    applicantId: req.user._id,
  });

  if (existingApplication) {
    throw new AppError('You have already applied for this job', 400);
  }

  const application = await JobApplication.create({
    jobId,
    applicantId: req.user._id,
    applicantName: req.user.name,
    message,
    audioMessage,
  });

  res.status(201).json({
    success: true,
    data: application,
  });
});

/**
 * @desc    Get applications for a job
 * @route   GET /api/jobs/:jobId/applications
 * @access  Private
 */
export const getJobApplications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { jobId } = req.params;

  // Check if job exists and user is the poster
  const job = await Job.findById(jobId);
  if (!job) {
    throw new AppError('Job not found', 404);
  }

  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to view applications', 403);
  }

  const applications = await JobApplication.find({ jobId })
    .populate('applicantId', 'name photo village district skills contactPrefs')
    .sort({ appliedAt: -1 });

  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
  });
});

/**
 * @desc    Get user's job applications
 * @route   GET /api/applications/my-applications
 * @access  Private
 */
export const getMyApplications = asyncHandler(async (req: AuthRequest, res: Response) => {
  const applications = await JobApplication.find({ applicantId: req.user._id })
    .populate('jobId')
    .sort({ appliedAt: -1 });

  res.status(200).json({
    success: true,
    count: applications.length,
    data: applications,
  });
});

/**
 * @desc    Update application status
 * @route   PUT /api/applications/:id/status
 * @access  Private
 */
export const updateApplicationStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    throw new AppError('Invalid status', 400);
  }

  const application = await JobApplication.findById(req.params.id).populate('jobId');

  if (!application) {
    throw new AppError('Application not found', 404);
  }

  const job = application.jobId as any;

  // Check if user is the job poster
  if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new AppError('Not authorized to update application status', 403);
  }

  application.status = status;
  await application.save();

  res.status(200).json({
    success: true,
    data: application,
  });
});
