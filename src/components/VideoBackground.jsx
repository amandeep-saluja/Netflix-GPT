import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
    useMovieTrailer(movieId);
    const trailerId = useSelector((store) => store.movies.trailerVideo);

    return (
        <div>
            {trailerId && (
                <iframe
                    className="w-full md:w-98 aspect-video"
                    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&modestbranding=1`}
                    title=""
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
            )}
        </div>
    );
};
export default VideoBackground;
