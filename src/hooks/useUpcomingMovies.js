import { useEffect } from 'react';
import { API_OPTIONS, GET_UPCOMING_MOVIES } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const getUpcomingMovies = async () => {
        const data = await fetch(GET_UPCOMING_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addUpcomingMovies(response.results));
    };
    useEffect(() => {
        getUpcomingMovies();
    }, []);
};
export default useUpcomingMovies;
