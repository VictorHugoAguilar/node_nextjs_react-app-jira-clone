import mongoose, { Model, Schema } from "mongoose";
import { EntryStatus } from "../interfaces";


interface IEntry {
    _id: string;
    title: string;
    desciption: string;
    createdAt: number;
    status: EntryStatus

}

const entrySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'finished'],
        message: 'Status must be one of: pending, in-progress, finished',
        default: 'pending'
    }
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;