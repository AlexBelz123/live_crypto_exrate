import React from 'react';

const useWebsocket = (url: string) => {
  const ws = React.useRef<any>(null);

  function getWebsocketProps(props: any) {}

  function handleOpen() {
    console.log('WebSocket Client Connected');
  }

  function handleClose() {
    console.log('Closed');
  }

  function handleError(error: Error) {
    console.log('error', error);
  }

  function handleMessage(event: any) {
    console.log(event.data);
  }

  React.useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = handleOpen;
    ws.current.onclose = handleClose;
    ws.current.onerror = handleError;
    ws.current.onmessage = handleMessage;
  }, []);
};

export default useWebsocket;
