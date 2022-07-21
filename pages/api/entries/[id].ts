import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string; }
    | IEntry[]
    | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);

        case 'DELETE':
            return deleteEntry(req, res);


        default:
            return res.status(200).json({ message: 'Not valid method' });
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    try {
        await db.connect();
        const entryToUpdate = await Entry.findById(id);

        if (!entryToUpdate) {
            await db.disconnect();
            return res.status(404).json({ message: 'Entry not found' });
        }

        const {
            title = entryToUpdate.title,
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;

        const updateEntry = await Entry.findByIdAndUpdate(id, {
            title,
            description,
            status
        }, { runValidators: true, new: true });

        return res.status(200).json(updateEntry!);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Error updating entry' });
    }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    throw new Error('Function not implemented.');
}

