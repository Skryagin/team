import React from 'react';
import PropTypes from "prop-types";
import Menu from "../Menu/Menu";


const Submenu = ({sub}) =>{
    return(
        <ul className ='sub-menu'>
            {sub.map(el => <li className="sub-menu__item"  key={`${el.parentkey} ${el.text}`}>
                <a href={el.link} className="sub-menu__link">{el.text}</a>
            </li>)}
        </ul>
    )
};

Submenu.propTypes = {
    sub:PropTypes.arrayOf(
        PropTypes.shape({
            text:PropTypes.string.isRequired,
            link:PropTypes.string.isRequired,
            parentKey: PropTypes.string.isRequired,
        })
    )
};
export default Submenu;