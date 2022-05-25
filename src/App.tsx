import { useEffect, useRef, useState } from 'react';
import ExRate from './components/ExRate';
import Graph from './components/Graph';
import { fetchHistoricalTrades } from './services';
import { getPrevDate } from './utils/getPrevDate';
import { IExrate } from './types';
import { GlobalStyle } from './utils/globalStyles';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

function App() {
  const [pastData, setPastData] = useState({});
  const [exrate, setExrate] = useState<IExrate | null>(null);
  const [error, setError] = useState({});
  const ws = useRef<any>(null);

  const sendMessage = () => {
    const jsonMsg = JSON.stringify({
      type: 'hello',
      apikey: '4E1A9D22-2DE1-4429-BBEA-C28497A67479',
      heartbeat: false,
      subscribe_data_type: ['exrate'],
      subscribe_filter_asset_id: ['BTC/USD'],
    });
    ws.current.send(jsonMsg);
  };

  const closeConnection = () => {
    ws.current.close();
  };

  useEffect(() => {
    ws.current = new WebSocket('ws://ws-sandbox.coinapi.io/v1/');

    ws.current.onopen = function () {
      console.log('WebSocket Client Connected');
    };

    ws.current.onclose = function () {
      console.log('Closed');
    };

    ws.current.onerror = (error: Error) => {
      console.log('error', error);
    };

    ws.current.onmessage = (event: any) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === 'exrate') setExrate(parsedData);
    };
  }, []);

  useEffect(() => {
    if (exrate) {
      const { now, past } = getPrevDate(exrate?.time, 3);

      fetchHistoricalTrades(past, now).then(
        (data) => setPastData(data),
        (err) => setError(err)
      );
    }
  }, [exrate]);

  return (
    <>
      {/* <GlobalStyle /> */}
      <button onClick={sendMessage}>Send Hello</button>
      <button onClick={closeConnection}>Close connection</button>
      {exrate && <ExRate rate={exrate.rate} />}
      <Graph data={data} />
    </>
  );
}

export default App;
