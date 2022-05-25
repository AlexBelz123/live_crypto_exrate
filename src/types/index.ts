export type TExrate = 'exrate';

export interface IExrate {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
  type: TExrate;
}
// {"time":"2022-05-24T18:43:48.7000000Z",
// "asset_id_base":"BTC","asset_id_quote":"USD",
// "rate":29367.015,"type":"exrate"}
