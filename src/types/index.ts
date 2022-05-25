export type TExrate = 'exrate';
export type TExrateStatus = 'idle' | 'up' | 'down';

export interface IExrate {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
  type: TExrate;
}

export interface IHistoricalData {
  price: number;
  size: number;
  symbol_id: string;
  taker_side: string;
  time_coinapi: string;
  time_exchange: string;
  uuid: string;
}
