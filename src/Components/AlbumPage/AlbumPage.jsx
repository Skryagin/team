import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card'
import FlipMove from "react-flip-move";
import './AlbumPage.css';

const AlbumPage = (props) => {

    return (
        <div className='content'>
            {props.albumArr.map (el => <Card url={el.image[2]['#text']} name={el.name} info={el.artist} key={el.name + el.url}/>)}
        </div>
    )
}

AlbumPage.propTypes = {

}

export default AlbumPage;