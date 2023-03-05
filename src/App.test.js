import { getByTestId, render, fireEvent, getByLabelText, screen, waitFor } from '@testing-library/react';
//import getData from './Videos';
import App from './App';

const data = [
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-a-dog-panting-outdoors-2248/1080p.mp4',
      link: 'https://coverr.co/videos/a-dog-panting-outdoors-C5qfQ2fp5V',
    },
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-dog-staring-at-a-latte-5538/1080p.mp4',
      link: 'https://coverr.co/videos/dog-staring-at-a-latte-RhOkNJByHc',
    },
  ];

  const getData = jest.fn();

  it('getData should be called on loading', async () => {

    //how to load this without causing errors and having to use Shallow
    render(
        <App />,
      );

      //await waitFor(() => queryByText('Name On Card'))

      expect(getData).toHaveBeenCalled();

  });

  
/* 
  it('calls console.log with "hello"', () => {
    const consoleSpy = jest.spyOn(console, 'log');
  
    console.log('hello');
  
    expect(consoleSpy).toHaveBeenCalledWith('hello');
  }); */

/*   it('should return video results', async () => {

    //const getDataSpy =  jest.fn().mockReturnValue(data);
    //getDataSpy.mockImplementation(jest.fn());

  const result = await getData();

  const expectedResult = [
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-a-dog-panting-outdoors-2248/1080p.mp4',
      link: 'https://coverr.co/videos/a-dog-panting-outdoors-C5qfQ2fp5V',
    },
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-dog-staring-at-a-latte-5538/1080p.mp4',
      link: 'https://coverr.co/videos/dog-staring-at-a-latte-RhOkNJByHc',
    },
  ];

  expect(result).toMatchObject(expectedResult);
  //expect(getDataSpy).toHaveBeenCalled();
}); */

 

/* describe('get video data ()', () => {
    let getDataSpy;
  
    beforeEach(() => {

        //getSpy = jest.spyOn(repo.api, 'getPage').mockResolvedValue(data);
        //getDataSpy = jest.spyOn(Videos, 'getData');
        getDataSpy = jest.spyOn(Videos, 'getData').mockResolvedValue(data);
    });
  
    it('should return video results', async () => {
        getDataSpy.mockImplementation(jest.fn());
  
      const result = await getData();
  
      const expectedResult = [
        {
          videoSrc: 'https://cdn.coverr.co/videos/coverr-a-dog-panting-outdoors-2248/1080p.mp4',
          link: 'https://coverr.co/videos/a-dog-panting-outdoors-C5qfQ2fp5V',
        },
        {
          videoSrc: 'https://cdn.coverr.co/videos/coverr-dog-staring-at-a-latte-5538/1080p.mp4',
          link: 'https://coverr.co/videos/dog-staring-at-a-latte-RhOkNJByHc',
        },
      ];
  
      expect(result).toMatchObject(expectedResult);
      expect(getDataSpy).toHaveBeenCalled();
    });
  
/*     it('should throw an error when update fails', () => {
      updateSpy.mockRejectedValueOnce('Failed to update');
  
      const errorMessage = 'Failed to submit some shows to Deezer';
      return expect(deezerAdapter.submitShows(shows)).rejects.toThrowError(errorMessage);
    }); 
  });
   */