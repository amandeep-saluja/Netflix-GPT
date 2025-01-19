import { API_OPTIONS, GET_NOW_PLAYING_MOVIES } from '../utils/constants';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        const data = await fetch(GET_NOW_PLAYING_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addNowPlayingMovies(response.results));
    };
    useEffect(() => {
        getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;
