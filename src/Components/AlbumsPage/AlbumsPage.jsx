import React from 'react';
import Card from '../Card/Card';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import './AlbumsPage.css';

const AlbumsPage = ({albumsData, addFavourite, handlerYoutube}) => {
    return (
        <FlipMove>
        <div className='content'>
        {albumsData.map((el, index) => <Card url={el.image[2]['#text']} name={el.name} listeners={el.artist} key={el.name} addFavourite={addFavourite}
         index={index} type='favoriteAlbums' interesting='interestingAlbums' checkArr='albumsData' handlerYoutube={handlerYoutube}/>)}
        </div>
        </FlipMove>
    );
};

AlbumsPage.propTypes = {
    
};

export default AlbumsPage;
