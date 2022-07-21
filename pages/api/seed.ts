import { NextApiRequest, NextApiResponse } from "next";

import { seedData, db } from "../../database/";

import { Entry } from "../../models";

type Data = {
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este recurso' });
    }

    await db.connect();

    await Entry.deleteMany();

    await Entry.insertMany(seedData.entries);

    await db.disconnect();

    res.status(200).json({ name: 'Proceso realizado correctamente' });

}