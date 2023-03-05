import ShallowRenderer from 'react-test-renderer/shallow';
import VideoPlayer from './VideoPlayer';

it('shows video info', async () => {
  const videos = [
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-a-dog-panting-outdoors-2248/1080p.mp4',
      link: 'https://coverr.co/videos/a-dog-panting-outdoors-C5qfQ2fp5V',
    },
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-dog-staring-at-a-latte-5538/1080p.mp4',
      link: 'https://coverr.co/videos/dog-staring-at-a-latte-RhOkNJByHc',
    },
  ];

  const renderer = new ShallowRenderer();
  renderer.render(<VideoPlayer videos={videos} />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
