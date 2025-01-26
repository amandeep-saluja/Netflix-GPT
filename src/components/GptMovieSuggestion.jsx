import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {
    const { movieNames, gptMovieResult } = useSelector((store) => store.gpt);
    if (!movieNames || movieNames.length === 0) return null;
    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
            <h1 className="font-bold text-4xl text-red-600">
                Movie Suggestions
            </h1>
            <div className="">
                {movieNames.map((movie, index) => (
                    <MovieList
                        key={movie}
                        title={movie}
                        movies={gptMovieResult[index].results}
                    />
                ))}
            </div>
        </div>
    );
};
export default GptMovieSuggestion;
