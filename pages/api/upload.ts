import type { NextApiRequest, NextApiResponse } from 'next'

import formidable from 'formidable'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case "GET": {

            };

            case "POST": {
                const { base64 } = req.body;
                console.log(base64);
            }
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};