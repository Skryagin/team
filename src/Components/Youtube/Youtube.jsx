import React from 'react';
// import Iframe from 'react-iframe-component';
import './Youtube.css';

const Youtube = ({ handlerYoutube, videoID}) => {
    return (
        <div className='player'>
            <p className='close' onClick={handlerYoutube}>&#10006;</p>
            <iframe
                src={`https://www.youtube.com/embed/${videoID}?autoplay=?`}
                frameborder="0" 
                allow="autoplay; encrypted-media"
                allowFullScreen>
            </iframe>
        </div>
    )
}
export default Youtube;