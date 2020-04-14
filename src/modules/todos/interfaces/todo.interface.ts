import { Document } from 'mongoose';

export interface ITodo extends Document {
  readonly account: string;
  readonly password: string;
}
