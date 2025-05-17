// models/Post.ts
import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
 /* slug: { type: String, required: true, unique: true }, */
});

export const BlogModel = mongoose.models.blog ||  mongoose.model('blog', BlogSchema);
