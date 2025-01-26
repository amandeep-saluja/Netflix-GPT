import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);
    return (
        movies && (
            <div className="mt-0 md:-mt-56 pl-2 md:pl-0 z-20 relative">
                <MovieList
                    title={'Now Playing'}
                    movies={movies.nowPlayingMovies}
                />
                <MovieList title={'Trending'} movies={movies.topRatedMovies} />
                <MovieList title={'Popular'} movies={movies.popularMovies} />
                <MovieList
                    title={'Upcoming Movies'}
                    movies={movies.upcomingMovies}
                />
            </div>
        )
    );
};
export default SecondaryContainer;
