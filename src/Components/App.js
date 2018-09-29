import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner'

import Search from './Search/Search';
import Sidebar from './Sidebar/Sidebar';
import ArtistPage from './ArtistPage/ArtistPage';
import SongsPage from './SongsPage/SongsPage';
import AlbumsPage from './AlbumsPage/AlbumsPage';
import { fetchData, getLocal, youtubeFetch } from '../helpers/fetch';
import './App.css';
import Youtube from './Youtube/Youtube';


class App extends Component {

    state = {
        artistsData: [],
        albumsData: [],
        songsData: [],
        searchValue: '',
        isLoading: true,
        youtubeIsActive: false,
        videoID: '',
        // currentPosition: 'Artists',
        favoriteArtists: [],
        favoriteAlbums: [],
        favoriteSongs: [],

        interestingArtists: [],
        interestingAlbums: [],
        interestingSongs: [],
        }

    componentDidMount() {
        fetchData('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json&limit=48')
        .then(data => (
            this.setState({
                artistsData: data.artists.artist.sort((a, b) => (+b.listeners) - (+a.listeners)),
                isLoading: false,
                favoriteArtists: getLocal('favoriteArtists'),
                interestingArtists: getLocal('interestingArtists'),
            })
        ))

        fetchData('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json&limit=48')
        .then(data => (
            this.setState({
                albumsData: data.albums.album,
                isLoading: false,
                favoriteAlbums: getLocal('favoriteAlbums'),
                interestingAlbums: getLocal('interestingAlbums'),
            })
        ))

        fetchData('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json&limit=30')
        .then(data => (
            this.setState({
                songsData: data.tracks.track,
                isLoading: false,
                favoriteSongs: getLocal('favoriteSongs'), 
                interestingSongs: getLocal('interestingSongs'),
            })
        ))
    }

    addFavourite = ({target}) => {
        const index = target.dataset.index;
        const arrForAdd = target.dataset.arrForAdd;
        const check = target.dataset.check;
        const curentItem = this.state[check][index];
        if (!this.state[arrForAdd].includes(curentItem)) {
            this.setState(prev => ({
                [arrForAdd]: [curentItem, ...prev[arrForAdd]],
            }), () => {
                localStorage.setItem(`${arrForAdd}`, JSON.stringify(this.state[arrForAdd]))
            })
        }
    }

    inputChange = (e) => {
        const value = e.target.value.toLowerCase();
        const name = e.target.name;
        this.setState({
            [name]: value,
        })
    }
    handlerYoutube = ({target}) => {
        console.log('object')
        if (target.className === 'close') {
            this.setState({
                youtubeIsActive: false,
            })
        } else {
        const query = target.dataset.query;
        console.log(query);
        youtubeFetch(query)
        .then(data => {
            console.log(data);
            this.setState({
                youtubeIsActive: true,
                videoID: data,
            })
        })
        }
    }

    searchData = (e) => {
        e.preventDefault();
        if (this.state.searchValue.trim() === '') {
            return
        }
        fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json&limit=48`)
        .then(({results}) => {
            this.setState({
                artistsData: results.artistmatches.artist,
            })
        })

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json&limit=48`)
        .then(({results}) => {
            this.setState({
                albumsData: results.albummatches.album,
            })
        })
        
        fetchData(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&format=json&limit=30`)
        .then(({results}) => {
            this.setState({
                songsData: results.trackmatches.track,
            })
        })
    }

    render () {
        const {artistsData, albumsData, songsData, searchValue, isLoading, favoriteArtists, favoriteAlbums, favoriteSongs,
             interestingArtists, interestingAlbums, interestingSongs, youtubeIsActive, videoID} = this.state;     
        return (
        <div className='wrapper'>
            <div className="container">
                <Sidebar/>
                <main className='main'>
                    {youtubeIsActive ?  <Youtube videoID={videoID} handlerYoutube={this.handlerYoutube}/> : null}
                   
                    <Search value={searchValue} onChange={this.inputChange} handlerSearch={this.searchData}/>
                    {isLoading ? 
                    <div className="loader">
                                <Loader
                                type="Audio" 
                                color="var(--red)" 
                                height="100" 
                                width="100"
                                />
                    </div> :   
                    <div>
                        <Switch>
                            <Route exact path='/' render={() => <ArtistPage handlerYoutube={this.handlerYoutube} artistsData={artistsData} addFavourite={this.addFavourite}/>}/>
                            <Route path='/albums' render={() => <AlbumsPage handlerYoutube={this.handlerYoutube} albumsData={albumsData} addFavourite={this.addFavourite}/>}/>
                            <Route path='/songs' render={() => <SongsPage handlerYoutube={this.handlerYoutube} songsData={songsData} addFavourite={this.addFavourite}/>}/>

                            <Route path='/FavoriteArtists' render={() => <ArtistPage handlerYoutube={this.handlerYoutube} artistsData={favoriteArtists} addFavourite={this.addFavourite}/>}/>
                            <Route path='/FavoriteAlbums' render={() => <AlbumsPage handlerYoutube={this.handlerYoutube} albumsData={favoriteAlbums} addFavourite={this.addFavourite}/>}/>
                            <Route path='/FavoriteSongs' render={() => <SongsPage handlerYoutube={this.handlerYoutube} songsData={favoriteSongs} addFavourite={this.addFavourite}/>}/>

                            <Route path='/InterestingArtists' render={() => <ArtistPage handlerYoutube={this.handlerYoutube} artistsData={interestingArtists} addFavourite={this.addFavourite}/>}/>
                            <Route path='/InterestingAlbums' render={() => <AlbumsPage handlerYoutube={this.handlerYoutube} albumsData={interestingAlbums} addFavourite={this.addFavourite}/>}/>
                            <Route path='/InterestingSongs' render={() => <SongsPage handlerYoutube={this.handlerYoutube} songsData={interestingSongs} addFavourite={this.addFavourite}/>}/>
                        </Switch>
                    </div>
                    }
                </main>
            </div>
        </div>
    )};
}

export default App;
