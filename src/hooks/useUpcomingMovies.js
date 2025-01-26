import { useEffect } from 'react';
import { API_OPTIONS, GET_UPCOMING_MOVIES } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
    const getUpcomingMovies = async () => {
        const data = await fetch(GET_UPCOMING_MOVIES, API_OPTIONS);
        const response = await data.json();
        dispatch(addUpcomingMovies(response.results));
    };
    useEffect(() => {
        !upcomingMovies && getUpcomingMovies();
    }, []);
};
export default useUpcomingMovies;
