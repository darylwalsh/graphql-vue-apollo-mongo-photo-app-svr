import mongoose from 'mongoose'

type SingleValueType<T> = Object extends T
  ? any
  : T extends typeof mongoose.SchemaTypes.Mixed
  ? any
  : T extends typeof Date
  ? Date
  : T extends { (...args: any[]): infer R }
  ? R
  : T extends { new (...args: any[]): infer R }
  ? R
  : never

type ValueType<T> = T extends Array<infer R>
  ? Array<SingleValueType<R>>
  : SingleValueType<T>
type DefaultType<T> = T extends { (...args: any[]): infer R } ? R : T

type FieldDescriptionType<T> = [ValueType<T>] extends [never]
  ? T extends { type: infer R; default: infer D }
    ? ValueType<R> | DefaultType<D>
    : T extends { type: infer R }
    ? ValueType<R>
    : never
  : ValueType<T>

type FieldType<T> = [FieldDescriptionType<T>] extends [never]
  ? T extends { [index: string]: any }
    ? docType<T>
    : never
  : FieldDescriptionType<T>

export type docType<T> = {
  [P in keyof T]: FieldType<T[P]>
}

const postDoc = {
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  messages: [{
    messageBody: {type: String, required: true},
    messageDate: {type: Date, default: Date.now},
    messageUser: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
  }]
}
export type PostSchema = mongoose.Document & docType<typeof postDoc>
const PostSchema = new mongoose.Schema(postDoc)

export const Post = mongoose.model('Post', PostSchema)
