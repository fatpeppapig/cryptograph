import { createCanvas } from 'canvas';

import { getCoinChartData } from './api';
import { generateCoinChart } from './chart';

// Generate image data that contains charts for each specified coin

export const generateImage = async (
    coins: string,
    width = 640,
    height = Math.floor((width * 3) / 4),
): Promise<Buffer> => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

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
