import { Schema, models, model, Model } from "mongoose";

export type QuestionProps = {
  question_description: string;
  answers: string[];
  correct_answer: number;
};

export type TopicProps = {
  _id?: string;
  category_key: string;
  title: string;
  date: Date;
  time_limit: string;
  attempts: number;
  points: number;
  description: string;
  questions: Array<QuestionProps>;
};

const QuestionSchema = new Schema<QuestionProps>({
  question_description: { required: true, type: String },
  answers: { required: true, type: [String] },
  correct_answer: { required: true, type: Number },
});

const TopicSchema = new Schema<TopicProps>({
  category_key: { required: true, type: String },
  title: { required: true, type: String },
  date: { required: true, type: Date },
  time_limit: { required: true, type: String },
  attempts: { required: true, type: Number },
  points: { required: true, type: Number },
  description: { required: true, type: String },
  questions: [QuestionSchema],
});

const Topic: Model<TopicProps> = models.Topic || model("Topic", TopicSchema);

export default Topic;
