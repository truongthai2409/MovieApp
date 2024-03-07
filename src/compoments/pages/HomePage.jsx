// import React from 'react';

import { Fragment } from "react";
import Banner from "../banner/Banner";
import Main from "../layout/Main";
import MovieList from "../movies/MovieList";

const HomePage = () => {
    return (
        <Fragment>
            <Main></Main>
            <Banner></Banner>
            <MovieList type="now_playing"></MovieList>
            <h1 className="text-3xl font-bold text-white">Trending</h1>
            <MovieList type="top_rated"></MovieList>
        </Fragment>
    );
};

export default HomePage;