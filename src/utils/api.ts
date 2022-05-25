import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://rest.coinapi.io/v1',
  headers: {
    'X-CoinAPI-Key': '8C8D5B8A-8E6A-4883-8499-2B97625CDD8A', // change
  },
});
