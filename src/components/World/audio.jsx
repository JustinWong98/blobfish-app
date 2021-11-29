import { useRef, useEffect } from 'react';

export const OtherAudio = ({ name, peer }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  console.log('peer :>> ', peer);
  return <audio playsInline ref={ref} autoPlay />;
};
