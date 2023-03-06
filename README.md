# Overview

The use of hooks in React when managing interactive video can be challenging when it comes to optimizing performance and providing a good user experience. In this article, I demonstrate how a video player with content that is dynamically loading can be managed effectively with useEffect, useRef, useCallback and useState web hooks.

The project includes a simple component hierarchy, data layer and different unit testing methods to help achieve best practices..

## Project setup 

The project code is available here. It is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and also includes [eslint](https://eslint.org/) and [prettier](https://prettier.io/) to ensure clean code. 

## Project structure

App.js - entry point for the application
Data,js - provides aysnchronous access to json data for videos
Components - VideoPlayer and VideoControls
Unit tests - App and Components each have their own unit tests

## Running the project

`npm install`
`npm start`

also to check for any coding issues:

`npm run eslint`
`npm run format`

## Design practices and code structure

### App.js

Data is loaded asynchronously in App.js. On load, useEffect includes fetchData in its dependency array and calls the fetchData method on initial loading. To prevent unneccessary reloads, fetchData is contained in a useCallback. This ensures the fetchData function is memoized (cached). Otherwise, each time useEffect is called, a new version of the function would be created and useEffect would call fetchData again.

    const [videos, setVideos] = useState();
    const fetchData = useCallback(async () => {
        getData()
        .then(result => setVideos(result))
        .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

The fetchData methods calls the getData function in Data.js asynchronously. Since Promises are being used with "thenable", it allows the results to be assigned to be state in the component level using setVideos. (Note: In a real-world scenario, where there could be multiple components using Videos, state would be stored at the application level using react-redux and the Store rather than at the component level which would allow data access across different components.) 

### Data.js

The getData mtehod in Data.js uses a Promise to asynchronously load json data using 'resolve'. If an error occurs, the Promise returns 'reject' with the error message. (Note: In a real-world scenario, data would be retrieved using a remiote request from a remote URL using axios or similar package).


    const getData = () => {
    return new Promise((resolve, reject) => {
        try{
        if (data) {
        resolve(data);
        } else {
        reject('No data is available.');
        }
        }
        catch(e){
        reject('An error occurred fetching data:' + e);
        };
    });
    };


### VideoPlayer

The VideoPlayer receives Videos from the main app.

    VideoPlayer = ({ videos }) => 

Videos are played based on the VideoIndex state property. The videoSrc maintains the current video and isPlaying sets the video to start. Video progress and duration are used to set the progress bar properties.

    const [videoIndex, setVideoIndex] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const { videoSrc, link } = videos[videoIndex];

When the videoIndex or videoSrc changes based on the dependencies in useEffect, the video source is reset, isPlaying is re-enabled which causes the useEffect with isPlaying dependency to execute, which then starts playing the video. The time is also started and progress bar updated.

        useEffect(() => {
            if (!isPlaying) {
            videoRef.current.pause();
            videoRef.current.src = videoSrc;
            setIsPlaying(true);
            }
        }, [videoIndex, videoSrc]);

            useEffect(() => {
            if (isPlaying) {
            videoRef.current.play();
            setVideoProgress(videoRef.current.currentTime);
            startTimer();
            } else {
            videoRef.current.pause();
            }
        }, [isPlaying]);

The current video that is playing can be switch using the VideoControls next and previous buttons as well as the onEnd event. When these events are raised the videoIndex is updated.

        const toPrevVideo = () => {
            setIsPlaying(false);
            if (videoIndex - 1 < 0) {
            setVideoIndex(videos.length - 1);
            } else {
            setVideoIndex(videoIndex - 1);
            }
        };

        const toNextVideo = () => {
            setIsPlaying(false);
            if (videoIndex < videos.length - 1) {
            setVideoIndex(videoIndex + 1);
            } else {
            setVideoIndex(0);
            }
        };

The HMTLVideoElement is maintained through re-renders by keeping through the videoRef. This allows the Video to not be impacted by state changes. There are build in events and properties of the Video: 
    poster provides a default background before the video is loaded.
    onDurationChangeHandler updates the state for the progress bar
    onEnded manages the next video to play once the current one completes    

            const videoRef = useRef();

            .....

            <video
              ref={videoRef}
              className="video"
              onDurationChange={onDurationChangeHandler}
              onEnded={onEnded}
              poster={'/giphyloading.gif'}
              autoPlay={true}
              muted={true}
            >
            </video>

The data for the progress bar is maintained using the intervalRef:  

    const intervalRef = useRef();

The intervalRef is started when the video is started, calling the startTimer. The videoProgress is updated using setInterval. The interval is reset when the video ends.

 const onDurationChangeHandler = e => {
    const seconds = Math.floor(e.target.duration);
    setDuration(seconds);
  };

  const onEnded = () => {
    clearInterval(intervalRef.current);
    toNextVideo();
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (videoRef.current) {
        setVideoProgress(videoRef.current.currentTime);
      }
    }, [1000]);
  };

### VideoControls

VideoControls receives callback handlers to respond to events from buttons for Play, Pause, Next and Previous. The isPlaying state determines if Play or Pause is shown.

    const VideoControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => (
    <div className="video-controls">
        <button type="button" className="prev" aria-label="Previous" onClick={onPrevClick}>
        <Prev />
        </button>
        {isPlaying ? (
        <button
            type="button"
            className="pause"
            data-testid="pause-test-id"
            onClick={() => onPlayPauseClick(false)}
            aria-label="Pause"
        >
            <Pause />
        </button>
        ) : (
        <button type="button" className="play" onClick={() => onPlayPauseClick(true)} aria-label="Play">
            <Play />
        </button>
        )}
        <button type="button" className="next" aria-label="Next" onClick={onNextClick}>
        <Next />
        </button>
    </div>
    );


### Unit tests

App.js, VideoPlayer and VideoControls are unit tested to verify they are properly loaded. The objective of unit testing is to reflect actual user interacting as accurately as possible. To that end,  the react testing library is used for App and VideoPlayer to render the document, initiate user events and assert the results are correct. Also, shallow rendering is used with the react test renderer to verify the app loaded is correct.




