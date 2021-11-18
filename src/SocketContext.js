// import React, { createContext, useState, useRef, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const SocketContext = createContext();
// // http://localhost:3002
// // https://sleepy-plateau-69754.herokuapp.com/
// const BACKEND_URL = 'http://localhost:3002';

// const socket = io(BACKEND_URL, {
//   withCredentials: true,
//   // rejectUnauthorized: false,
// });
// socket.on('connect_error', (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

// const ContextProvider = ({ children }) => {
//   const [stream, setStream] = useState();
//   const [me, setMe] = useState('');
//   const [call, setCall] = useState({});
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState('')
//   const [peers, setPeers] = useState([]);
//     // array of peers for people in room    
//   const peersRef = useRef([]);

//   // use a ref to populate video iframe with the src of stream
//   const myVideo = useRef();
//   const myVideoModified = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();
//   const socketRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices 
//       .getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         // TODO: Modify to facemesh
//         console.log('getting video from mediadevice');
//         setStream(currentStream);
//         //plays video in steam
//         console.log(myVideo)
//         myVideo.current.srcObject = currentStream;
//     // person who joins connects to other peers
//     socketRef.current.on('get users', users => {

//       const peers = [];
//       users.forEach(userID => {
//         // for each user, create a peer and send in our id and stream
//         const peer = createPeer(userID, socketRef.current.id, stream)
//         // peersRef will handle collection of peers (all simple peer logic)
//         peersRef.current.push({
//           peerID: userID,
//           peer,
//         })
//         // setting state of array of peers for rendering purposes
//         peers.push(peer);
//       })
//       setPeers(peers);
//     })
//     // on the receiver end, this fires when a new user joins
//     socketRef.current.on("user joined", ({signal, callerID}) => {
//       const peer = addPeer(signal, callerID, stream);
//       peersRef.current.push({
//         peerID: callerID,
//         peer,
//       })

//       setPeers(users => [...users, peer]);
//     })
//     // when handshake is complete - receiver gives back a signal
//     socketRef.current.on('receiving returned signal', (data) => {
//       // find peer that we are receiving from since we are going to receive multiple peers.
//       // we loop through the list of peers and match the id of the one trying to signal us
//       const item = peersRef.current.find(p => p.peerID === data.id);
//       item.peer.signal(data.signal) 
//     })
    
//       });

//     socket.on('me', (id) => setMe(id));

//     socket.on('callUser', ({ from, name: callerName, signal }) => {
//       setCall({ isReceivingCall: true, from, name: callerName, signal });
//     });
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);
//     const audioTrack = stream.getAudioTracks()
//     const userModStream = myVideoModified.current.captureStream();
//     userModStream.addTrack(audioTrack[0])
//     console.log('userModStream :>> ', userModStream);

//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream: userModStream,
//     });

//     peer.on('signal', (data) => {
//       socket.emit('answerCall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//       console.log('getting stream from initiator');
//       console.log('currentStream :>> ', currentStream);
//       userVideo.current.srcObject = currentStream;
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

//   const callUser = (id) => {
//     const audioTrack = stream.getAudioTracks()
//     const userModStream = myVideoModified.current.captureStream();
//     userModStream.addTrack(audioTrack[0])
//     console.log('userModStream :>> ', userModStream);
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: userModStream,
//     });
//     peer.on('signal', (data) => {
//       socket.emit('callUser', {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name,
//       });
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//       console.log('getting stream from initiator');
//       console.log('currentStream :>> ', currentStream);
//     });

//     socket.on('callAccepted', (signal) => {
//       setCallAccepted(true);

//       peer.signal(signal);
//     });

//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);

//     connectionRef.current.destroy();

//     window.location.reload();
//   };

//   // when we create a new peer, the signal event fires, we capture the signal and send it down to each individual
//   const createPeer = (userToSignal, callerID, stream) => {
//     const audioTrack = stream.getAudioTracks()
//     const userModStream = myVideoModified.current.captureStream();
//     userModStream.addTrack(audioTrack[0])
//     console.log('userModStream :>> ', userModStream);
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: userModStream,
//     });

//     peer.on('signal', (signal) => {
//       socketRef.current.emit('sending signal', {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });

//     return peer;
//   };

//   // incomingSignal is sent when new person comes into room, users wait for that signal before firing off their own signal back to the initiator(the one who joined the room)
//   const addPeer = (incomingSignal, callerID, stream) => {
//     // when a peer's initiator is false, they only signal when they receive a signal
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });
    
//     peer.on('signal', (signal) => {
//       // sends back to the server and then back to the callerID to complete handshake
//       socketRef.current.emit('returning signal', { signal, callerID });
//     });
//     // fires the above event to fire
//     peer.signal(incomingSignal);

//     return peer
//   };

//   return (
//     <SocketContext.Provider
//       value={{
//         call,
//         callAccepted,
//         myVideo,
//         myVideoModified,
//         userVideo,
//         stream,
//         name,
//         setName,
//         callEnded,
//         me,
//         callUser,
//         leaveCall,
//         answerCall,
//         addPeer,
//         createPeer,
//         socketRef,
//         peers
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export { ContextProvider, SocketContext };
