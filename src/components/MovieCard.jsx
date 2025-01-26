import { IMG_URL } from '../utils/constants';

const MovieCard = ({ posterPath }) => {
    if (posterPath === null) return null;
    return (
        <div className="w-48 pr-4">
            <img src={IMG_URL + posterPath} alt="Movie card" />
        </div>
    );
};
export default MovieCard;
