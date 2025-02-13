import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS, GET_POPULAR_MOVIES } from '../utils/constants';
import { addPopularMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    const getPopularMovies = async () => {
        const data = await fetch(GET_POPULAR_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addPopularMovies(response.results));
    };
    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, []);
};
export default usePopularMovies;
