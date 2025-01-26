export const LOGO =
    'https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png';

export const AVATAR = (name) =>
    'https://ui-avatars.com/api/?format=svg&name=' +
    name +
    '&background=000&color=4ff&rounded=true&bold=true';
//'https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABaSDR-kTPhPYcVVGSsV0jC3D-Q5HZSFE6fjzAM-4cMpltx1Gw9AV7OTnL8sYnC6CBxOBZQEAJLjStt822uD2lctOvNR05qM.png?r=962';

export const BACKGROUND_IMG =
    'https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_large.jpg';

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY,
    },
};

export const GOOGLE_AI_API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;

export const GET_VIDEO_ID = (movieId) =>
    `https://api.themoviedb.org/3/movie/${movieId}/videos`;

export const IMG_URL = 'https://image.tmdb.org/t/p/w780/';

export const GET_NOW_PLAYING_MOVIES =
    'https://api.themoviedb.org/3/movie/now_playing?page=1';
export const GET_POPULAR_MOVIES =
    'https://api.themoviedb.org/3/movie/popular?page=1';
export const GET_TOP_RATED_MOVIES =
    'https://api.themoviedb.org/3/movie/top_rated?page=1';
export const GET_UPCOMING_MOVIES =
    'https://api.themoviedb.org/3/movie/upcoming?page=1';

export const SUPPORTED_LANGUAGES = [
    {
        identifier: 'en',
        name: 'English',
    },
    {
        identifier: 'hi',
        name: 'Hindi',
    },
    {
        identifier: 'es',
        name: 'Spanish',
    },
];

export const SEARCH_MOVIE_URL = (movie) =>
    `https://api.themoviedb.org/3/search/movie?query=${movie}&page=1`;
