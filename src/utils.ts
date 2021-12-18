export const getMargin = (width: number) => width / 32;

export const plot = (
    value: number,
    min: number,
    max: number,
    height: number,
): number => Math.round(height - ((value - min) / (max - min)) * height);
