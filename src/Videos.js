 const data = [
  {
    videoSrc: 'https://cdn.coverr.co/videos/coverr-a-dog-panting-outdoors-2248/1080p.mp4',
    link: 'https://coverr.co/videos/a-dog-panting-outdoors-C5qfQ2fp5V',
  },
  {
    videoSrc: 'https://cdn.coverr.co/videos/coverr-dog-staring-at-a-latte-5538/1080p.mp4',
    link: 'https://coverr.co/videos/dog-staring-at-a-latte-RhOkNJByHc',
  },
] 

/* const getData = async () => {
  return [
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-a-dog-panting-outdoors-2248/1080p.mp4',
      link: 'https://coverr.co/videos/a-dog-panting-outdoors-C5qfQ2fp5V',
    },
    {
      videoSrc: 'https://cdn.coverr.co/videos/coverr-dog-staring-at-a-latte-5538/1080p.mp4',
      link: 'https://coverr.co/videos/dog-staring-at-a-latte-RhOkNJByHc',
    },
  ];
}; */

const getData = (()  => {

  return new Promise ((resolve, reject) => {
  console.log('getdata');
  if(data){
    resolve(data)
  }
  else {reject ('An error occurred fetching data.')};
})}); 

export default getData;
