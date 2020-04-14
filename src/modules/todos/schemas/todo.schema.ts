import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  complete: Boolean,
  todo: String,
});
