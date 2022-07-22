import { NextApiRequest, NextApiResponse } from "next";

import { seedData, db } from "../../database/";

import { Entry } from "../../models";
import { showLogs } from "../../utils";

type Data = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    showLogs("info", "[seed.ts] in handler with data:", req.body);

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este recurso' });
    }

    await db.connect();

    showLogs('warn', 'deleting all entries');
    await Entry.deleteMany();

    showLogs('warn', 'insert data in bd', seedData.entries);
    await Entry.insertMany(seedData.entries);

    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' });
}