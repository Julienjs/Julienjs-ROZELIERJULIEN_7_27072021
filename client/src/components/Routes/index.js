import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import connexion from '../../pages/connexion';
import post from '../../pages/post';
import profil from '../../pages/profil';
import Navbar from '../Navbar';


const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={connexion} />
                <Route path="/profil" exact component={profil} />
                <Route path="/post" exact component={post} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
