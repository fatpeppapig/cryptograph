import { Canvas, createCanvas, loadImage } from 'canvas';

import { plot } from './utils';

// Generate coin chart canvas

export const generateCoinChart = async (
    width: number,
    height: number,
    coinChartData: any,
): Promise<Canvas> => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const icon = await loadImage(coinChartData.image.large);

    const margin = width / 32;

    const prices = coinChartData.prices.map((price: number[]) => price[1]);

    const pricesSorted = [...prices].sort();

    const minPrice = pricesSorted[0];
    const maxPrice = pricesSorted[pricesSorted.length - 1];

    const latestPrice = prices[prices.length - 1];
    const delta24h =
        ((latestPrice - prices[prices.length - 25]) / latestPrice) * 100;

    const scale = prices.length / width;

    ctx.strokeStyle = '#2af';
    ctx.moveTo(0, plot(prices[0], minPrice, maxPrice, height));

    prices.map((price: number, i: number) =>
        ctx.lineTo(
            Math.floor(i / scale),
            plot(price, minPrice, maxPrice, height),
        ),
    );

    ctx.lineWidth = margin / 16;
    ctx.stroke();

    ctx.drawImage(icon, margin, margin, margin, margin);

    ctx.font = `${margin}px Helvetica`;
    ctx.fillStyle = '#000';
    ctx.fillText(
        `${coinChartData.name} (${coinChartData.symbol.toUpperCase()})`,
        margin * 2.3,
        margin * 1.9,
    );

    ctx.font = `${margin * 2.5}px Helvetica`;
    ctx.fillText(
        `$${latestPrice.toFixed(2)} (${delta24h > 0 ? '+' : '-'}${Math.abs(
            delta24h,
        ).toFixed(2)}%)`,
        margin,
        margin * 4.5,
    );

    return canvas;
};
