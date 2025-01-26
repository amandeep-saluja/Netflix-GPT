import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { BACKGROUND_IMG } from '../utils/constants';

const GptSearch = () => {
    return (
        <div className="">
            <div className="fixed netflix-logo -z-10">
                <img
                    className="h-screen md:h-full object-cover"
                    src={BACKGROUND_IMG}
                    alt="Background"
                />
            </div>
            <GptSearchBar />
            <GptMovieSuggestion />
        </div>
    );
};
export default GptSearch;
