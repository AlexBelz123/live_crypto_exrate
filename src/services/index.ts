import { AxiosResponse } from 'axios';
import { api } from '../utils/api';

export const fetchHistoricalTrades = async <T>(
  start = '2016-01-01T00:00:00'
): Promise<AxiosResponse<T>> => {
  return await api.get(
    `trades/BITSTAMP_SPOT_BTC_USD/history?time_start=${start}`
  );
};
