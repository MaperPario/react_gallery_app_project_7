import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoList = props => {
  
  const results = props.data;
  let photos;
  if (results.length) {
    photos = results.map(photo => <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);    
  } else {
    photos = <NotFound />
  }
  
  return(
    <div>
      <h2>{`${props.query}`}</h2>
      <ul>
        {photos}
      </ul>
    </div>
  )
}

export default PhotoList;