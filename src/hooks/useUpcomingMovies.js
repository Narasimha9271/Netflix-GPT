import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
    //fetching the data from TMDB API and putting into our store
    const dispatch = useDispatch();

    //Adding memoization => Reducing a lot of api calls
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

    const getUpcomingMovies = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/upcoming?page=1",
            API_OPTIONS
        );
        const json = await data.json();

        //console.log(json.results);
        dispatch(addUpcomingMovies(json.results));
    };

    useEffect(() => {
        !upcomingMovies && getUpcomingMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useUpcomingMovies;
