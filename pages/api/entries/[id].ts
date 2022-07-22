import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';
import { showLogs } from '../../../utils';

type Data = { message: string; }
    | IEntry[]
    | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    showLogs('info', 'in handler with data:', req.body);

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        case 'GET':
            return getEntry(req, res);
        case 'DELETE':
            return deleteEntry(req, res);
        default:
            return res.status(200).json({ message: 'Not valid method' });
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    showLogs('warn', 'in updateEntry with data:', req.body);
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

        await db.disconnect();

        return res.status(200).json(updateEntry!);
    } catch (error) {
        await db.disconnect();
        showLogs('error', 'error in access db:', error);
        return res.status(500).json({ message: JSON.stringify(error) });
    }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    showLogs('warn', 'in deleteEntry with data:', req.body);
    const { id } = req.query;

    try {
        await db.connect();
        const entryToDelete = await Entry.findById(id);

        if (!entryToDelete) {
            await db.disconnect();
            return res.status(404).json({ message: 'Entry not found' });
        }

        const deleted = await Entry.findByIdAndDelete(id);
        await db.disconnect();

        return res.status(200).json(deleted!);
    } catch (error) {
        await db.disconnect();
        showLogs('error', 'error in access db:', error);
        return res.status(500).json({ message: JSON.stringify(error) });
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    showLogs('warn', 'in getEntry with data:', req.body);
    const { id } = req.query;

    try {
        await db.connect();
        const entrySearched = await Entry.findById(id);

        if (!entrySearched) {
            return res.status(400).json({ message: `Not found data by id ${id}` }!);
        }

        await db.disconnect();
        return res.status(200).json(entrySearched!);
    } catch (error) {
        await db.disconnect();
        showLogs('error', 'error in access db:', error);
        return res.status(500).json({ message: JSON.stringify(error) });
    }

}

