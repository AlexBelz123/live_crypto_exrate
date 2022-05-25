import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { IHistoricalData } from '../types';

interface GraphProps {
  data: IHistoricalData[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="time_coinapi" />
      <YAxis dataKey="price" />
      <Tooltip />
    </LineChart>
  );
};

export default React.memo(Graph);
