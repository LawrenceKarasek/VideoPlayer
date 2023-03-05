import React, { useState, useEffect, useCallback, Fragment } from 'react';
import getData from './Videos';
import VideoPlayer from './Components/VideoPlayer';

function App() {
  const [videos, setVideos] = useState();
  const fetchData = useCallback(async () => {
    getData()
    .then(result => setVideos(result))
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <Fragment>{videos && <VideoPlayer videos={videos} />}</Fragment>;
}

export default App;
