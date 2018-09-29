import React from 'react';
import {NavLink} from 'react-router-dom'; 
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <aside className="aside">
            <Logo/>
            <Menu menu={[
                {text: 'Main', link: '#', submenu: []},
        
                {text: 'Interesting', link: '#', submenu: [
                    {text: 'Artist', link: 'interestingArtists'},
                    {text: 'Albums', link: 'interestingAlbums'},
                    {text: 'Songs', link: 'interestingSongs'},                        
                ]},
                {text: 'Favourite', link: '#', submenu: [
                          {text: 'Artist', link: 'favoriteArtists'},
                         {text: 'Albums', link: 'favoriteAlbums'},
                         {text: 'Songs', link: 'favoriteSongs'},
                ]},
            ]}/>
        </aside>
    )
};

export default Sidebar;