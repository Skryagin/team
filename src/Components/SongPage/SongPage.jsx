import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from "react-flip-move";
import Song from '../Song/Song';
import axios from 'axios';
import './SongPage.css';
import icon from './react.png';



const SongPage = ({getSong}) => {
    return (
        <div className='content'>
           {getSong.map(el => <Song src={el.image[1]['#text']} nameArtist={el.artist.name} nameAlbum={el.name}/>)} 
        </div>
    );
}

export default SongPage;