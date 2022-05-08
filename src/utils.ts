export const plot = (
    value: number,
    min: number,
    max: number,
    height: number,
): number => Math.round(height - ((value - min) / (max - min)) * height);
