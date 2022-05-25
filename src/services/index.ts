//trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2016-01-01T00:00:00
import { api } from '../utils/api';

export const fetchHistoricalTrades = (from: string, to: string) => {
  return api.get(
    `trades/BITSTAMP_SPOT_BTC_USD/history?time_start=${from}&time_end=${to}`
  );
};
