import { NextApiRequest, NextApiResponse } from 'next';
import { showLogs } from '../../utils';

type Data = {
    ok: boolean;
    message: string | string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    showLogs('warn', 'in handler with data:', req.body);

    const { message = 'Bad Request' } = req.query;

    res.status(400).json({
        ok: false,
        message
    });
}