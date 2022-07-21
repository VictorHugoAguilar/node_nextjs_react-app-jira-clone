import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";

type Data = {
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ message: 'No tiene acceso a este recurso' });
    }

    await db.connect();

    await db.disconnect();

    res.status(200).json({ name: 'Proceso realizado correctamente' });

}