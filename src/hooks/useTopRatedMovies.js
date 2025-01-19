import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS, GET_TOP_RATED_MOVIES } from '../utils/constants';
import { addTopRatingMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const getTopRatedMovies = async () => {
        const data = await fetch(GET_TOP_RATED_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addTopRatingMovies(response.results));
    };
    useEffect(() => {
        getTopRatedMovies();
    }, []);
};
export default useTopRatedMovies;
