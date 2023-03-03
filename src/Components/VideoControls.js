import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as Pause } from '../assets/pause.svg';
import { ReactComponent as Next } from '../assets/next.svg';
import { ReactComponent as Prev } from '../assets/prev.svg';

const VideoControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => (
  <div className="video-controls">
    <button type="button" className="prev" aria-label="Previous" onClick={onPrevClick}>
      <Prev />
    </button>
    {isPlaying ? (
      <button type="button" className="pause" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
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

VideoControls.propTypes = {
  isPlaying: PropTypes.bool,
  onPlayPauseClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
};

export default VideoControls;
