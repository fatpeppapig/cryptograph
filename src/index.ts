import dotenv from 'dotenv';
import express from 'express';

import { generateImage } from './image';

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

app.get('/', async (req, res) => {
    const image = await generateImage(
        (req.query.coins as string) || process.env.COINS,
        parseInt(req.query.width as string) || undefined,
        parseInt(req.query.height as string) || undefined,
    );

    res.writeHead(200, {
        'Content-Type': process.env.IMAGE_TYPE,
        'Content.length': image.length,
    });

    res.end(image, 'binary');
});

app.listen(port, () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
});
