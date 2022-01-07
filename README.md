# Blobfish App
## What is this App?
Blobfish is a 3D "Metaverse" world in which users can create their own avatars, create and join a virtual 3D world with other users and communicate through both audio as well as visually through their avatar facial movements - which are mapped and rendered realtime using the user's webcam.

This project was created and developed by [Jia En](https://github.com/Ennnm "Jia En") and [Justin Wong](https://github.com/JustinWong98 "Justin Wong"), as a project for their bootcamp.

It spanned 2weeks (13 Nov - 29 Nov 2021)

You can find our deployed app [here](https://blobfish-app.netlify.app "here").



## Usage steps
Do remember to enable your browser to access your webcam and your microphone.
- Create an account [here](https://blobfish-app.netlify.app/signup "here"), you should then be redirected to the dashboard.
- Create a new avatar in our [avatar creation page](https://blobfish-app.netlify.app/avatar "avatar creation page") or choose a default model.
- Create or join a 3D world
- Avatars can be moved using the WASD keys inside the 3D world.
## Technical Stack and Description
For our project, we used:

##### Architecture

- [React.js](https://reactjs.org/)

- [Express](https://sequelize.org/v7/)
- [Sequelize/ PostgreSQL](https://sequelize.org/v7/)

##### Real-time machine learning (ML) for facial expression and head tracking

- [MediaPipe](https://google.github.io/mediapipe/)

##### 3D modelling of avatar facial expressions, their bodies and their world

- [React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

##### Transmission of audio, avatar positioning and avatar expressions client-client

- [WebRTC/ Simple-peer](https://github.com/feross/simple-peer)
- [Socket.IO](https://socket.io/)

##### Styling

- [Material-Ui](https://mui.com/)

##### Deployment

- [Netlify](https://www.netlify.com/)
- [Heroku](https://www.heroku.com/)

##### Planning 

- [notion planning docs](https://economic-brand-644.notion.site/Project-5-75672b3502cb412297501b1db87bdcff)

  

[frontend repo](https://github.com/JustinWong98/blobfish-app)

[backend repo](https://github.com/Ennnm/blobfish-app-backend)

<p align="right">(<a href="#top">back to top</a>)</p>

## Challenges

##### MediaPipe

- Getting head orientation from facemesh coordinates returned by MediaPipe.
- Mapping facemesh data to eye and mouth expression on the 3D avatar.

##### React-Three-Fiber

- Creation of avatar models, making them customizable and reloadable by users.
- Positioning of avatars, objects, and camera.
- Updating facial expression using useFrame

##### Simple-peer

- Typically used for client-client video conferencing. Had to adapt this for transmitting user's position and head data.
- Tried using the audio channel for transmitting both audio and avatar JSON data including avatar positioning and expression. Figured that a dedicated data channel has to be created between peers, this cannot be piggybacked.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [] Further testing on audio transmission 

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->

## Contact

[Jia En](https://github.com/Ennnm "Jia En")  - [@ennnm_](https://twitter.com/ennnm_) - jiaen.1sc4@gmail.com
[Justin Wong](https://github.com/JustinWong98) - justinwong8991@gmail.com

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

* [DaFluffyPotato](https://www.youtube.com/watch?v=2mwK5H4xsuI)
* [Discover Three Js by Lewy Blue](https://discoverthreejs.com/)
* [Coding With Chiam](https://www.youtube.com/watch?v=JhyY8LdAQHU&t=141s)

<p align="right">(<a href="#top">back to top</a>)</p>

