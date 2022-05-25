import axios from 'axios';
import { apiKey, baseURL } from '../constants';

export const api = axios.create({
  baseURL,
  headers: {
    'X-CoinAPI-Key': apiKey,
  },
});
