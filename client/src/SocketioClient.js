import React, { useEffect } from 'react';
import io from 'socket.io-client';
const socket = io();

export default function SocketioClient() {
  useEffect(() => {
    socket.on('consolelog', (msg) => {
      console.log(msg);
    });
  }, []);

  return <div></div>;
}
