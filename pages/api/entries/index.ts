import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string; }
    | IEntry[]
    | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);

        case 'POST':
            return createEntry(req, res);

        default:
            break;

            res.status(200).json({ message: 'Hello World!' });
    }

}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: -1 });
    await db.disconnect();
    return res.status(200).json(entries);
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { title = '', description = '' } = req.body;

    const entry = new Entry({
        title,
        description,
        createdAt: Date.now(),
    });

    try {
        await db.connect();
        await entry.save();
        await db.disconnect();

        return res.status(201).json(entry);

    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Error creating entry' });
    }
}

