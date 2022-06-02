import React from "react";

import "./footer.scss";

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div
            className="footer"
            style={{
                backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png)`,
            }}
        >
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                            alt=""
                        />
                        <Link to="/">tMovies</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
