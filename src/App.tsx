import { useEffect, useRef, useState } from 'react';
import ExRate from './components/ExRate';
import Graph from './components/Graph';
import Subscribtion from './components/Subscribtion';
import { fetchHistoricalTrades } from './services';
import { usePrevious, useAsync } from './hooks';
import { formatTime } from './utils/formatTime';
import { ErrorFallback } from './utils/errorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { IExrate, IHistoricalData, TExrateStatus } from './types';
import styled from 'styled-components';
import { apiKey } from './constants';

const Container = styled.div`
  padding: 0 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [pastData, setPastData] = useState<IHistoricalData[]>([]);
  const [exrate, setExrate] = useState<IExrate | null>(null);
  const ws = useRef<WebSocket>();
  const prevExrate = usePrevious<number>(exrate?.rate || 0);
  let status: TExrateStatus = 'idle';
  status = exrate && prevExrate < exrate.rate ? 'down' : 'up';

  const subscribe = () => {
    console.log('BAABY');
    const jsonMsg = JSON.stringify({
      type: 'hello',
      apikey: apiKey,
      heartbeat: false,
      subscribe_data_type: ['exrate'],
      subscribe_filter_asset_id: ['BTC/USD'],
    });
    ws.current?.send(jsonMsg);
  };

  useEffect(() => {
    function connect() {
      ws.current = new WebSocket('ws://ws-sandbox.coinapi.io/v1/');

      ws.current.onopen = function () {
        console.log('WebSocket Client Connected');
      };

      ws.current.onclose = function (e) {
        console.log(
          'Socket is closed. Reconnect will be attempted in 1 second.',
          e.reason
        );
        setTimeout(function () {
          connect();
        }, 1000);
      };

      ws.current.onerror = (error) => {
        console.log('error', error);
      };

      ws.current.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === 'exrate') setExrate(parsedData);
      };
    }

    connect();

    // I fetched only static data cuz of API limit
    // we can fetch new data when exrate is updated
    fetchHistoricalTrades<IHistoricalData[]>().then(
      (res) => {
        const exrates = res.data;

        exrates.forEach((exrate) => {
          exrate.time_coinapi = formatTime(exrate.time_coinapi);
        });

        setPastData(exrates);
      },
      (err) => {
        throw err;
      }
    );
  }, []);

  return (
    <Container>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Subscribtion label="BTC/USD" onClick={subscribe} />
        {exrate && <ExRate exrate={exrate} status={status} />}
      </ErrorBoundary>
      <Graph data={pastData} />
    </Container>
  );
}

export default App;
