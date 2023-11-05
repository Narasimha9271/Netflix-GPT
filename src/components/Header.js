import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const handleSignOut = () => {
        //signout logic
        signOut(auth)
            .then(() => {})
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                //sign in case
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });

        //this will be unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        //Toggle GPT Search
        dispatch(toggleGptSearchView());
    };
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };
    return (
        <div className="absolute px-6 py-2 bg-gradient-to-b flex flex-col md:flex-row justify-between from-black z-10 w-screen">
            <img
                className="w-48 mx-auto md:mx-0"
                src={LOGO}
                alt="netflix-logo"
            />
            {user && (
                <div className="flex">
                    {showGptSearch && (
                        <select
                            className="font-semibold p-2 h-10 mt-4 m-1 rounded-lg text-white bg-gray-600 "
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option
                                    key={lang.identifier}
                                    value={lang.identifier}
                                >
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button
                        className="font-semibold p-2 h-10 mt-4 m-1 rounded-lg text-white bg-pink-500 "
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? "Home" : "GPTSearch"}
                    </button>
                    <img
                        className="hidden md:block h-10 w-10 rounded-2xl mt-4"
                        src={user?.photoURL}
                        alt="user-logo"
                    />
                    <button
                        onClick={handleSignOut}
                        className="bg-gray-600 font-semibold p-2 h-10 mt-4 m-1 rounded-lg text-white"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
