import { createCanvas } from 'canvas';

import { getCoinChartData } from './api';
import { generateCoinChart } from './chart';

export const generateImage = async (
    width = 640,
    coins: string,
): Promise<Buffer> => {
    const height = Math.floor((width * 3) / 4);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    const coinChartData = await Promise.all(
        coins.split(',').map(async (id) => await getCoinChartData(id.trim())),
    );

    await Promise.all(
        coinChartData.map(async (coinChartData, i, a) => {
            const chartHeight = Math.floor(height / a.length);

            ctx.drawImage(
                await generateCoinChart(width, chartHeight, coinChartData),
                0,
                i * chartHeight,
            );

            if (i <= a.length) {
                const linePos = (i + 1) * chartHeight;
                ctx.moveTo(0, linePos);
                ctx.lineTo(width, linePos);
                ctx.stroke();
            }
        }),
    );

    return canvas.toBuffer();
};
