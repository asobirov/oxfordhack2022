import type { NextApiRequest, NextApiResponse } from 'next'

import formidable from 'formidable'
import { getItemFact } from '@helpers/getItemFact';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case "GET": {

            };

            case "POST": {
                // const { base64 } = req.body;
                console.log(req.body);

                // TODO: send requiest to server

                const prompt = "can";

                res.status(200).json({
                    success: false,
                    data: {
                        prompt,
                        description: getItemFact(prompt),
                    }
                });
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