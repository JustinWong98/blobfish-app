import { useRef, useEffect } from 'react';

export const OtherAudio = ({ name, peer }) => {
  // try {
  //   console.log(
  //     'videoRef.current in otherVideoFrame:>> ',
  //     videoRef.current.srcObject
  //   );
  // } catch (e) {
  //   console.log('no src object in other video frame');
  // }

  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  console.log('peer :>> ', peer);
  return <audio playsInline ref={ref} autoPlay />;
};
