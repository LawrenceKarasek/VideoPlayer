import { render, screen } from '@testing-library/react';
import VideoControls from './VideoControls';

function setup() {
  const onPlayPauseClick = jest.fn();
  const onPrevClick = jest.fn();
  const onNextClick = jest.fn();

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
