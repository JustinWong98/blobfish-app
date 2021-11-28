export const getWebCamStream = async (stream, videoElem, setVideo) => {
  console.log('stream.current :>> ', stream.current);
  let userStream;
  // while (stream.current === undefined) {
  await navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      stream.current = currentStream;

      videoElem.current.srcObject = currentStream;
      userStream = currentStream;
      setVideo(true);
      console.log('suceeded in getting video stream');
    })
    .catch((err) => {
      console.log('error in getting stream', err);
    });

  // return userStream;
  // }
};
