import { Response } from 'express';
import Message from '../models/Message';
import MessageThread from '../models/MessageThread';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler, AppError } from '../middleware/errorHandler';

/**
 * @desc    Get user's message threads
 * @route   GET /api/messages/threads
 * @access  Private
 */
export const getThreads = asyncHandler(async (req: AuthRequest, res: Response) => {
  const threads = await MessageThread.find({
    participants: req.user._id,
  })
    .populate('participants', 'name photo')
    .sort({ lastMessageAt: -1 });

  res.status(200).json({
    success: true,
    count: threads.length,
    data: threads,
  });
});

/**
 * @desc    Get or create thread between two users
 * @route   POST /api/messages/threads
 * @access  Private
 */
export const getOrCreateThread = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { otherUserId } = req.body;

  if (!otherUserId) {
    throw new AppError('Other user ID is required', 400);
  }

  const participants = [req.user._id, otherUserId].sort();

  let thread = await MessageThread.findOne({
    participants: { $all: participants },
  }).populate('participants', 'name photo');

  if (!thread) {
    thread = await MessageThread.create({
      participants,
    });

    thread = await thread.populate('participants', 'name photo');
  }

  res.status(200).json({
    success: true,
    data: thread,
  });
});

/**
 * @desc    Get messages in a thread
 * @route   GET /api/messages/threads/:threadId
 * @access  Private
 */
export const getThreadMessages = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { threadId } = req.params;
  const { limit = 50, skip = 0 } = req.query;

  const thread = await MessageThread.findById(threadId);

  if (!thread) {
    throw new AppError('Thread not found', 404);
  }

  // Check if user is participant
  if (!thread.participants.some((p) => p.toString() === req.user._id.toString())) {
    throw new AppError('Not authorized to view this thread', 403);
  }

  const messages = await Message.find({ threadId })
    .sort({ sentAt: -1 })
    .limit(Number(limit))
    .skip(Number(skip))
    .populate('senderId', 'name photo')
    .populate('receiverId', 'name photo');

  // Mark messages as read
  await Message.updateMany(
    {
      threadId,
      receiverId: req.user._id,
      isRead: false,
    },
    { isRead: true }
  );

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages.reverse(),
  });
});

/**
 * @desc    Send a message
 * @route   POST /api/messages
 * @access  Private
 */
export const sendMessage = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { threadId, receiverId, content, audioUrl } = req.body;

  if (!threadId || !receiverId) {
    throw new AppError('Thread ID and receiver ID are required', 400);
  }

  if (!content && !audioUrl) {
    throw new AppError('Message must have content or audio', 400);
  }

  const thread = await MessageThread.findById(threadId);

  if (!thread) {
    throw new AppError('Thread not found', 404);
  }

  // Check if user is participant
  if (!thread.participants.some((p) => p.toString() === req.user._id.toString())) {
    throw new AppError('Not authorized to send message in this thread', 403);
  }

  const message = await Message.create({
    threadId,
    senderId: req.user._id,
    receiverId,
    content,
    audioUrl,
  });

  // Update thread
  thread.lastMessage = content || 'Audio message';
  thread.lastMessageAt = new Date();

  // Update unread count for receiver
  const receiverIdStr = receiverId.toString();
  const currentUnread = thread.unreadCount.get(receiverIdStr) || 0;
  thread.unreadCount.set(receiverIdStr, currentUnread + 1);

  await thread.save();

  const populatedMessage = await message.populate([
    { path: 'senderId', select: 'name photo' },
    { path: 'receiverId', select: 'name photo' },
  ]);

  res.status(201).json({
    success: true,
    data: populatedMessage,
  });
});

/**
 * @desc    Mark messages as read
 * @route   PUT /api/messages/threads/:threadId/read
 * @access  Private
 */
export const markAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { threadId } = req.params;

  const thread = await MessageThread.findById(threadId);

  if (!thread) {
    throw new AppError('Thread not found', 404);
  }

  // Update messages
  await Message.updateMany(
    {
      threadId,
      receiverId: req.user._id,
      isRead: false,
    },
    { isRead: true }
  );

  // Reset unread count
  const userIdStr = req.user._id.toString();
  thread.unreadCount.set(userIdStr, 0);
  await thread.save();

  res.status(200).json({
    success: true,
    message: 'Messages marked as read',
  });
});
