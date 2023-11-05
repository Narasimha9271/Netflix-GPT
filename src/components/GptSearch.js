import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMG } from "../utils/constants";

export default function GptSearch() {
    return (
        <div>
            <div className="fixed w-full h-full -z-10">
                <img
                    className="w-full h-full object-cover"
                    src={BACKGROUND_IMG}
                    alt="netflix-logo"
                />
            </div>

            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    );
}
