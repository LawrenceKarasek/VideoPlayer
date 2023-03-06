import React, { useState, useEffect, useRef, Fragment } from 'react';
import VideoControls from './VideoControls';
import PropTypes from 'prop-types';
import '../styles.css';

const VideoPlayer = ({ videos }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { videoSrc, link } = videos[videoIndex];
  const videoRef = useRef();
  const intervalRef = useRef();

  let currentPercentage;
  const videoStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

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

  const onScrub = value => {
    clearInterval(intervalRef.current);
    videoRef.current.currentTime = value;
    setVideoProgress(videoRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

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

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
      setVideoProgress(videoRef.current.currentTime);
      startTimer();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      videoRef.current.pause();
      videoRef.current.src = videoSrc;
      setIsPlaying(true);
    }
  }, [videoIndex, videoSrc]);

  return (
    <Fragment>
      {videos && (
        <div className="video-player">
          <div className="video-info">
            <label data-test-id="source-test-id">Source </label>
            <a className="link" data-test-id="link" href={link}>
              {link}
            </a>
          </div>
          <div className="video-info">
            <video
              ref={videoRef}
              className="video"
              onDurationChange={onDurationChangeHandler}
              onEnded={onEnded}
              poster={'/giphyloading.gif'}
              autoPlay={true}
              muted={true}
            ></video>
            <VideoControls
              isPlaying={isPlaying}
              onPrevClick={toPrevVideo}
              onNextClick={toNextVideo}
              onPlayPauseClick={setIsPlaying}
            />
          </div>
          {duration && (
            <input
              type="range"
              value={videoProgress}
              step="1"
              min="0"
              max={duration}
              className="progress"
              onChange={e => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              style={{ background: videoStyling }}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

VideoPlayer.propTypes = {
  videos: PropTypes.array,
};

export default VideoPlayer;
