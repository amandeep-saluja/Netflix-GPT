import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import model from '../utils/googleAI';
import { API_OPTIONS, SEARCH_MOVIE_URL } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchQuery = useRef(null);
    const dispatch = useDispatch();

    const searchMovieInTMDB = async (movie) => {
        const response = await fetch(SEARCH_MOVIE_URL(movie), API_OPTIONS);
        return await response.json();
    };

    const handleGptSearchClick = async () => {
        const searchTxt = searchQuery.current.value;

        const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${searchTxt}". 
        Only give me names of 5 movies, comma seperated like the exam[le result given ahead. 
        Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya.`;

        const gptResults = await model.generateContent(gptQuery);

        if (!gptResults.response.candidates) {
            console.error('No results found');
            alert('No results found');
        }

        const suggestions =
            gptResults.response.candidates[0].content.parts[0].text?.split(',');
        console.log(suggestions);

        const tmbdSearchResults = suggestions?.map((movie) =>
            searchMovieInTMDB(movie)
        );

        const results = await Promise.all(tmbdSearchResults);
        dispatch(
            addGptMovieResult({
                movieNames: suggestions,
                movieResult: results,
            })
        );
    };

    return (
        <div className="pt-[10%] flex justify-center">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-1/2 bg-black grid grid-cols-12"
            >
                <input
                    ref={searchQuery}
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].gptSearchPlaceholder}
                />
                <button
                    className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};
export default GptSearchBar;
