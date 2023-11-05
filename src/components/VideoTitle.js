import React from "react";
import { AiFillPlayCircle, AiFillInfoCircle } from "react-icons/ai";
const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[10%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-3xl md:text-6xl md:font-bold">{title}</h1>
            <p className="hidden md:inline-block py-6 text-lg w-1/3">
                {overview}
            </p>
            <div className="mt-2 flex flex-row gap-2">
                <button className="bg-white text-black p-2 md:py-1 px-2 text-xl bg-opacity-90 rounded-md hover:bg-opacity-80 flex flex-row gap-1">
                    <div className="pt-1 ">
                        <AiFillPlayCircle />
                    </div>{" "}
                    <div>Play</div>
                </button>
                <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-8 text-xl bg-opacity-50 rounded-md flex-row gap-1">
                    <div className="pt-1 ">
                        <AiFillInfoCircle />
                    </div>{" "}
                    <div>More Info</div>
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
