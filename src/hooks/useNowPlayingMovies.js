import { API_OPTIONS, GET_NOW_PLAYING_MOVIES } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(
        (store) => store.movies.nowPlayingMovies
    );
    const getNowPlayingMovies = async () => {
        const data = await fetch(GET_NOW_PLAYING_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addNowPlayingMovies(response.results));
    };
    useEffect(() => {
        if (!nowPlayingMovies) getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
