import { CoinGeckoClient } from 'coingecko-api-v3';

export const getCoinChartData = async (id: string): Promise<any> => {
    const client = new CoinGeckoClient({
        timeout: 10000,
        autoRetry: true,
    });

    return {
        ...(await client.coinId({
            id,
            localization: false,
            tickers: false,
            market_data: false,
            community_data: false,
            developer_data: false,
            sparkline: false,
        })),
        ...(await client.coinIdMarketChart({
            id,
            vs_currency: 'usd',
            days: 30,
        })),
    };
};
