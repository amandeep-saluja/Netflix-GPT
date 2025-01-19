import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';

const Browse = () => {
    useNowPlayingMovies();
    useTopRatedMovies();
    usePopularMovies();
    useUpcomingMovies();
    return (
        <div className="bg-black">
            <Header />
            <MainContainer />
            <SecondaryContainer />
        </div>
    );
};
export default Browse;
