import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import io from 'socket.io-client';

const ENDPOINT = 'https://react-socketio-sayan.herokuapp.com/';
let socket;
socket = io(ENDPOINT);

export default function Chat({ userName }) {
  const msgcontainer = useRef();
  const msgbox = useRef();
  const arrMSG = [
    {
      Value: 'Welcome to my simple chat app',
      type: 'rec',
    },
  ];
  if (localStorage.getItem('simplechatapp1') === null) {
    localStorage.setItem('simplechatapp1', JSON.stringify(arrMSG));
  }

  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('simplechatapp1'))
  );
  const msgOBJ = JSON.parse(localStorage.getItem('simplechatapp1'));
  const appendMSG = (val) => {
    msgOBJ.push({ Value: val, type: 'rec' });
    localStorage.setItem('simplechatapp1', JSON.stringify(msgOBJ));
    setMessages(JSON.parse(localStorage.getItem('simplechatapp1')));
  };
  const sentByMe = (val) => {
    msgOBJ.push({ Value: val, type: 'sent' });
    localStorage.setItem('simplechatapp1', JSON.stringify(msgOBJ));
    setMessages(JSON.parse(localStorage.getItem('simplechatapp1')));
  };
  socket.on('msgbyme', appendMSG);
  const sendMSG = () => {
    let value = msgbox.current.value;
    socket.emit('msgSent', value);
    sentByMe(value);
    msgbox.current.value = '';
    //the chat container scrolls to the botton that is the recent messages
    msgcontainer.current.scrollTop = msgcontainer.current.scrollHeight;
  };
  return (
    <div className='chatMain'>
      <div ref={msgcontainer}>
        <p className='receivedMSG'>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            perferendis animi, ipsa cum nisi officia.
          </span>
        </p>
        <p className='sentMSG'>
          <span>Lorem ipsum dolor sit, amet consectetur adipisicing.</span>
        </p>
        <p className='sentMSG'>
          <span>Lorem ipsum dolor sit, amet consectetur adipisicing.</span>
        </p>
        <p className='receivedMSG'>
          <span>Lorem ipsum dolor sit, amet consectetur adipisicing.</span>
        </p>
        {messages.map((item) => (
          <p className={item.type === 'sent' ? 'receivedMSG' : 'sentMSG'}>
            <span>{item.Value}</span>
          </p>
        ))}
      </div>
      <section>
        <input type='text' placeholder='Message' ref={msgbox} />
        <button className='sendBTN' onClick={sendMSG}>
          Send
        </button>
      </section>
    </div>
  );
}
