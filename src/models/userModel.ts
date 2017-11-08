
import { Document, Schema, Model, model } from 'mongoose';



export var userSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number,
    avatar: String
});

userSchema.pre("save", function (next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    } else {
        this.updatedAt = now;
    }
    next();
});

export const User: Model<any> = model('User', userSchema);
