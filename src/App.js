// import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
// import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';
import './App.css';
import { w3cwebsocket } from 'websocket';

// const client = io('wss://ws-sandbox.coinapi.io/v1/');

function App() {
  const [pastData, setpastData] = useState({});
  const [exrate, setExrate] = useState({});
  const ws = useRef(null);
  let first = useRef(false);

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

    // api call to get and set exrated list ?

    ws.current.onopen = function () {
      console.log('WebSocket Client Connected');
    };

    ws.current.onclose = function () {
      console.log('Closed');
    };

    ws.current.onerror = (e) => {
      console.log('error');
    };

    ws.current.onmessage = (event) => {
      console.log(event.data);
      if (event.data.type === 'exrate') setExrate(event.data);
    };

    setTimeout(() => {
      first.current = true;
    }, 1000);
  }, []);

  //   useEffect(() => {
  //     if (!first.current) {
  //       return;
  //     }

  //     // const getHistoricalData = async () => {
  //     //   const res = await axios.get(
  //     //     'https://rest.coinapi.io/v1/quotes/BITSTAMP_SPOT_BTC_USD/history?time_start=2016-01-01T00:00:00',
  //     //     {
  //     //       headers: {
  //     //         'X-CoinAPI-Key': '4E1A9D22-2DE1-4429-BBEA-C28497A67479',
  //     //       },
  //     //     }
  //     //   );
  //     //   console.log(res.data);
  //     //   setpastData(res.data);
  //     // };

  //     // getHistoricalData();
  //     ws.current.onerror = (e) => {
  //       console.log('error');
  //     };
  //     ws.current.onmessage = (event) => {
  //       console.log(event);
  //     };
  //   }, [pair]);

  return (
    <div className="card">
      {/* <Crypto /> */}
      <button onClick={sendMessage}>Send Hello</button>
      <button onClick={closeConnection}>Close connection</button>
    </div>
  );
}

export default App;
