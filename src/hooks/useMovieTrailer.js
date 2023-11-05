import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movie_id) => {
    const dispatch = useDispatch();

    //Adding memoization
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);

    const getMovieVideos = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/" +
                movie_id +
                "/videos?language=en-US",
            API_OPTIONS
        );
        const json = await data.json();

        const trailers = json.results.filter(
            (video) => video.type === "Trailer"
        );
        const trailer = trailers.length ? trailers[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    };
    useEffect(() => {
        !trailerVideo && getMovieVideos();
    }, []);
};

export default useMovieTrailer;
