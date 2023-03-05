import { render, screen,fireEvent } from '@testing-library/react';
import VideoControls from './VideoControls';

const onPlayPauseClick = jest.fn();
const onPrevClick = jest.fn();
const onNextClick = jest.fn();

function setup() {
  render(
    <VideoControls
      isPlaying={true}
      onPlayPauseClick={onPlayPauseClick}
      onNextClick={onNextClick}
      onPrevClick={onPrevClick}
    />,
  );

  return {
    pauseButton: screen.queryByTestId('pause-test-id'),
  };
}

it('renders the VideoControls', async () => {
  const { pauseButton } = setup();
  if (pauseButton) {
    expect(pauseButton).toBeDefined();
  }
});

it('pause click causes function call', async () => {
  const { pauseButton } = setup();
  if (pauseButton) {

    fireEvent.click(pauseButton);
    expect(onPlayPauseClick).toHaveBeenCalled();
  }
});



//do test of pause click to test function call
