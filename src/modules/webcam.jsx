export const getWebCamStream = (stream, videoElem, setVideo) => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      stream.current = currentStream;

      videoElem.current.srcObject = currentStream;
      setVideo(true);
      console.log('suceeded in getting video stream');
    })
    .catch((err) => {
      console.log('error in getting stream', err);
    });
};
