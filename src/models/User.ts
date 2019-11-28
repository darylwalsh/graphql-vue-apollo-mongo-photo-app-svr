import mongoose from 'mongoose'

type SingleValueType<T> =   Object extends T ? any :
                            T extends typeof mongoose.SchemaTypes.Mixed ? any :
                            T extends typeof Date ? Date :
                            T extends {(...args: any[]): infer R} ? R :
                            T extends {new (...args:any[]): infer R} ? R : never;

type ValueType<T> =     T extends Array<infer R> ? Array<SingleValueType<R>> : SingleValueType<T>;
type DefaultType<T> =   T extends {(...args: any[]): infer R} ? R : T;

type FieldDescriptionType<T> =  [ValueType<T>] extends [never] ? 
                                    T extends {type: infer R, default: infer D} ? ValueType<R> | DefaultType<D> :
                                    T extends {type: infer R} ? ValueType<R> : never   
                                : ValueType<T>;

type FieldType<T> =     [FieldDescriptionType<T>] extends [never] ? 
                            T extends {[index: string]: any} ? docType<T> : never
                        : FieldDescriptionType<T>;

export type docType<T> = {
  [P in keyof T]: FieldType<T[P]>
}

const userDoc = {
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Post',
  },
}
export type UserSchema = mongoose.Document & docType<typeof userDoc>
const UserSchema = new mongoose.Schema(userDoc)

export const User = mongoose.model('User', UserSchema)