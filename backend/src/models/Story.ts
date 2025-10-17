import mongoose, { Document, Schema } from 'mongoose';

interface IStoryChoice {
  id: string;
  text: string;
  isCorrect?: boolean;
  feedback: string;
  feedbackAudio?: string;
}

interface IStoryScene {
  id: string;
  text: string;
  audioUrl?: string;
  imageUrl?: string;
  choices?: IStoryChoice[];
  outcome?: string;
  outcomeAudio?: string;
}

interface IQuizQuestion {
  id: string;
  question: string;
  audioUrl?: string;
  options: string[];
  correctIndex: number;
}

export interface IStory extends Document {
  packId: mongoose.Types.ObjectId;
  title: string;
  character: string;
  characterImage: string;
  scenes: IStoryScene[];
  quizQuestions: IQuizQuestion[];
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StoryChoiceSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean },
  feedback: { type: String, required: true },
  feedbackAudio: { type: String },
}, { _id: false });

const StorySceneSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  audioUrl: { type: String },
  imageUrl: { type: String },
  choices: [StoryChoiceSchema],
  outcome: { type: String },
  outcomeAudio: { type: String },
}, { _id: false });

const QuizQuestionSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  audioUrl: { type: String },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
}, { _id: false });

const StorySchema = new Schema<IStory>(
  {
    packId: { type: Schema.Types.ObjectId, ref: 'StoryPack', required: true },
    title: { type: String, required: true },
    character: { type: String, required: true },
    characterImage: { type: String, required: true },
    scenes: [StorySceneSchema],
    quizQuestions: [QuizQuestionSchema],
    badge: { type: String },
  },
  { timestamps: true }
);

// Indexes
StorySchema.index({ packId: 1 });

export default mongoose.model<IStory>('Story', StorySchema);
