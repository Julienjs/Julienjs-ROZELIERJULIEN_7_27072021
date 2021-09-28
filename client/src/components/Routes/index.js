/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../Pages/Home';
import Post from '../../Pages/Post';
import Profile from '../../Pages/Profile';
import Footer from '../Footer';
import Navbar from '../Navbar';
import User from '../User';




const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profile} />
                <Route path="/post" exact component={Post} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </Router>
    );
};

export default index;
