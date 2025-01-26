import React from 'react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-98 aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-2/4">{overview}</p>
            <div className="">
                <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
                    <span className="text-2xl">&#9205;</span>Play
                </button>
                <button className="mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
                    <span className="text-2xl">&#128712;</span> More Info
                </button>
            </div>
        </div>
    );
};
export default VideoTitle;
