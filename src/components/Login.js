import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG, USER_ICON } from "../utils/constants";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        //validate the form data
        const message = checkValidData(
            email.current.value,
            password.current.value
        );
        setErrorMessage(message);
        if (message) return;

        //signup/signin logic
        if (!isSignInForm) {
            //signup logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    //console.log(user);
                    updateProfile(user, {
                        displayName: "name.current.value",
                        photoURL: USER_ICON,
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } =
                                auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL,
                                })
                            );

                            navigate("/browse");
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            //signin logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    // eslint-disable-next-line no-unused-vars
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    };
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    return (
        <div>
            <Header />
            <div className="absolute w-full h-full">
                <img
                    className="w-full h-full object-cover"
                    src={BACKGROUND_IMG}
                    alt="netflix-logo"
                />
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute my-12 mx-auto right-0 left-0 p-6 sm:p-12 bg-black bg-opacity-75 w-11/12 md:w-3/12 text-white  mt-36 "
            >
                <h1 className="font-bold text-2xl sm:text-4xl py-4 sm:py-6 pl-2">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                <div className="flex flex-col">
                    {!isSignInForm && (
                        <input
                            type="text"
                            placeholder=" Full Name"
                            className="p-2 mb-2 sm:mb-3 bg-gray-800 h-12 text-gray-300 rounded-md"
                        />
                    )}
                    <input
                        ref={email}
                        type="Email"
                        placeholder="Email or phone number"
                        className="p-2 mb-2 bg-gray-800 h-12 text-gray-300 rounded-md"
                    />

                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="p-2 mb-2 sm:mt-2 bg-gray-800 h-12 text-gray-300 rounded-md"
                    />
                    <p className="text-red-500">{errorMessage}</p>

                    {!isSignInForm && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="p-2 mt-2 sm:mt-3 bg-gray-800 h-12 text-gray-300 rounded-md"
                        />
                    )}

                    <button
                        className="font-semibold h-12 bg-red-600 text-white rounded-md mt-6"
                        onClick={handleButtonClick}
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
                        <p className="text-gray-500 font-medium mb-2 sm:mb-0">
                            {isSignInForm
                                ? "New to Netflix?"
                                : "Already registered?"}
                        </p>
                        <p
                            className="font-medium cursor-pointer"
                            onClick={toggleSignInForm}
                        >
                            {!isSignInForm ? "Sign In" : "Sign Up"} Now
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
