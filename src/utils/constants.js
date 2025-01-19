export const LOGO =
    'https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png';

export const AVATAR = (name) =>
    'https://ui-avatars.com/api/?format=svg&name=' +
    name +
    '&background=000&color=4ff&rounded=true&bold=true';
//'https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABaSDR-kTPhPYcVVGSsV0jC3D-Q5HZSFE6fjzAM-4cMpltx1Gw9AV7OTnL8sYnC6CBxOBZQEAJLjStt822uD2lctOvNR05qM.png?r=962';

export const BACKGROUND_IMG =
    'https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_large.jpg';

export const API_KEY = '3640f2696188f988ed188e9fcf8f3f91';

export const ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQwZjI2OTYxODhmOTg4ZWQxODhlOWZjZjhmM2Y5MSIsIm5iZiI6MTczNzE5MzAwMy4yOTQwMDAxLCJzdWIiOiI2NzhiNzYyYjY4ZTBkODczNjM2ZGNmOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dPfCGWDFvTvWRFJbtabDwii_ABaHisYrOnVLWh_1WYo';

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjQwZjI2OTYxODhmOTg4ZWQxODhlOWZjZjhmM2Y5MSIsIm5iZiI6MTczNzE5MzAwMy4yOTQwMDAxLCJzdWIiOiI2NzhiNzYyYjY4ZTBkODczNjM2ZGNmOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dPfCGWDFvTvWRFJbtabDwii_ABaHisYrOnVLWh_1WYo',
    },
};

export const GET_VIDEO_ID = (movieId) =>
    `https://api.themoviedb.org/3/movie/${movieId}/videos`;
