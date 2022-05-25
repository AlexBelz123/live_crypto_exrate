import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://rest.coinapi.io/v1',
  headers: {
    'X-CoinAPI-Key': 'F2228AEF-B564-4705-A4F5-1D4DE4803E88', // change
  },
});
