import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS, GET_TOP_RATED_MOVIES } from '../utils/constants';
import { addTopRatingMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
    const getTopRatedMovies = async () => {
        const data = await fetch(GET_TOP_RATED_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addTopRatingMovies(response.results));
    };
    useEffect(() => {
        !topRatedMovies && getTopRatedMovies();
    }, []);
};
export default useTopRatedMovies;
