import React from 'react';
import './Album.css';

const Album = ({src, album, artist}) => {
        return (
        <div className="artist-card">
        <figure>
            <img src={src} alt='alt' className="artist-card__img"/>
            <figcaption className={"artist-card"}>
                <p className="artist-card__name">{artist}</p>
                <p className="artist-card__link">{album}</p>
                {/*<p className="artist-card__number-albums">5 albums</p>*/}
            </figcaption>
        </figure>
    </div>
    );
};

export default Album;