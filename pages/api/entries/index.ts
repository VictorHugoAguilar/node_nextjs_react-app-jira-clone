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
