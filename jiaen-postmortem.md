# Post-Mortem Meeting (Blobfish metaverse react app)

### Technical Review

###### "Technical" refers to software logic and syntax.

##### What went well? Please share a link to the specific code.
1. Implemmentation of facemesh through reference of limited documentation + copying parts of other people's lib
2. Learning enough of three.js, discovering react three fibre
3. Mapping movements of face mesh to avatars
4. Reducing scope of work 
3D overlay of video to just 3D avatar in the world

##### What were the biggest challenges you faced? Please share a link to the specific code.

1. deploying the code ended with a lot of cors errors. hope to fix
  uncaught exception
2. Use of webrtc. Understanding it is hard as its quite abstract, feel like its something that i can't write on my own but something that should be adapted for our use.
3. Initially tried to piggy bag transfer of data with the audio channel that caused data to cease transfer when the audio stream started. Really perplexed, discovered that the data channel and audio should be separate and it caused many duplicate code. 
  Code file with useeffects ended up to be 600 lines long not sure how to refactor.
4. Also more peers were produced than expected 12 for 2 clients. I thought only 2 peers exists
5. Using datachannels to transmit facial expression, movements is one level up from following tutorials. Refactoring of the code helped in us following the sequence of transfers better and in debugging
6. Use useFrame in threejs, in two nested components. semi-worried its not an efficient way to work, cause lags.
7. Had some uncertainties with efficiency. Computer fans worked nearly at 100% while client was open. must be the media pipe algorithm + threejs. Not sure where is the real issue and how it can be improved

##### What would you do differently next time?

don't know

### Process Review

###### "Process" refers to app development steps and strategy.

##### What went well?

1. Managed to explore webrtc + threejs + mediapipe
2. +justin helped guided the initial process by getting us to do wireframe + ERD
3. check in twice a day, once at 5pm and at 9pm
4. Maybe a better understanding of cors would help us debug better. don't know if separate configuration is needed for axios and sockets. 

Saw some bit about cookies but are they for setting cookies on the front end to affect the backend? or does it refer to the normal process of backend talking to front end