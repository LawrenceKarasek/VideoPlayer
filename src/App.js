import React, { useState, useEffect, useCallback, Fragment } from 'react';
import getData from './Videos';
import VideoPlayer from './Components/VideoPlayer';
import './styles.css';

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

  return (
    <Fragment>
      <div>
        <h1> React Demo of useEffect, useCallback and useRef to manage a Video Player</h1>
      </div>
      <div>{videos && <VideoPlayer videos={videos} />}</div>
    </Fragment>
  );
}

export default App;
