import React, {useState, useEffect, useCallback,Fragment} from "react";
import getData from "./Videos";
import VideoPlayer from "./VideoPlayer"
import './App.css';

function App() {

const [videos, setVideos] = useState();
const fetchData = useCallback (async() => {

  const response = await getData();
  setVideos(response);

},[] )

useEffect(() =>{
  fetchData();

},[fetchData] )

  return (
    <Fragment>
      {videos &&  (
        <VideoPlayer videos={videos}/>
      )}
    </Fragment>
  );
}

export default App;
