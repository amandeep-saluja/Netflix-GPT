import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS, GET_VIDEO_ID } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';

const UseMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);
    const getTrailerFor = async () => {
        const data = await fetch(GET_VIDEO_ID(movieId), API_OPTIONS);
        const response = await data.json();

        const filterData = response.results
            .filter((video) => (video.type = 'Trailer'))
            .map((video) => video.key);
        const trailer = filterData[0];
        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        !trailerVideo && getTrailerFor();
    }, []);
};
export default UseMovieTrailer;
