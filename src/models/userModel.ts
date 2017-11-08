
import { Document, Schema, Model, model } from 'mongoose';



export var userSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number,
    avatar: String
});
export const User: Model<any> = model('User', userSchema);
