import React from 'react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-98 aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-2/4 hidden md:inline-block">
                {overview}
            </p>
            <div className="my-4 md:m-0">
                <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80">
                    <span className="text-2xl">&#9205;</span>Play
                </button>
                <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
                    <span className="text-2xl">&#128712;</span> More Info
                </button>
            </div>
        </div>
    );
};
export default VideoTitle;
