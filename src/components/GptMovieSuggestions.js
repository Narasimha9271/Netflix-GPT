import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export default function GptMovieSuggestions() {
    const { movieNames, movieResults } = useSelector((store) => store.gpt);
    if (!movieNames) return null;

    return (
        // <div className="bg-black text-white bg-opacity-90 py-12 px-4 relative">
        //     <div className="container mx-auto">
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        //             {movieNames.map((movieName, index) => (
        //                 <div
        //                     key={movieName}
        //                     className="bg-white p-4 rounded-lg shadow-lg"
        //                 >
        //                     <MovieList
        //                         title={
        //                             <span
        //                                 className="text-red-500 font-semibold0
        //                             "
        //                             >
        //                                 {movieName}
        //                             </span>
        //                         }
        //                         movies={movieResults[index]}
        //                     />
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
        <div className="p-4 m-4 bg-black text-white bg-opacity-90 relative">
            <div>
                {movieNames.map((movieName, index) => (
                    <MovieList
                        key={movieName}
                        title={movieName}
                        movies={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    );
}
