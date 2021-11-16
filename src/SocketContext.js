import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
// change to url of deployed server later
const BACKEND_URL = 'http://localhost:3002';

const socket = io(BACKEND_URL, {
  withCredentials: true,
  // rejectUnauthorized: false,
});
socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState();
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);

  // use a ref to populate video iframe with the src of stream
  const myVideo = useRef();
  const myVideoModified = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {

        setStream(currentStream);
        //plays video in steam
        myVideo.current.srcObject = currentStream;
      }, []);

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    console.log(stream)

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    console.log('myVideo :>> ', myVideo);
    console.log('myVideoModified :>> ', myVideoModified);
    const userModStream = myVideoModified.current.captureStream(25);

    console.log('userModStream :>> ', userModStream);
    // const peer = new Peer({ initiator: true, trickle: false, userModStream });
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (data) => {
      setCallAccepted(true);
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log(
        'userVideo.current.srcObject :>> ',
        userVideo.current.srcObject
      );
      setCallAccepted(true);
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        myVideoModified,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
