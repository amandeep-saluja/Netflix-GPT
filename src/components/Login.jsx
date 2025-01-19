import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { AVATAR, BACKGROUND_IMG } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const isSignInFormForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        const eId = email?.current?.value;
        const pwd = password?.current?.value;
        const message = checkValidData(eId, pwd);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            //sign up logic
            createUserWithEmailAndPassword(auth, eId, pwd)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: fullName?.current?.value,
                        photoURL: AVATAR(user.displayName),
                    }).then(() => {
                        const { uid, email, displayName, photoURL } =
                            auth.currentUser;
                        dispatch(
                            addUser({ uid, email, displayName, photoURL })
                        );
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                    setErrorMessage(errorCode + ' - ' + errorMessage);
                });
        } else {
            //sign in logic
            signInWithEmailAndPassword(auth, eId, pwd)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                    setErrorMessage(errorCode + ' - ' + errorMessage);
                });
        }
    };
    return (
        <div>
            <Header />
            <div className="absolute netflix-logo">
                <img src={BACKGROUND_IMG} alt="Background" />
            </div>
            <form
                className="login-form p-12 bg-black absolute w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="login-label py-4 text-3xl">
                    {isSignInForm ? 'Sign In' : 'Sign Up'}{' '}
                </div>
                {!isSignInForm && (
                    <input
                        ref={fullName}
                        type="text"
                        placeholder="Full name"
                        className="w-full p-4 my-4 bg-gray-900"
                    />
                )}
                <input
                    ref={email}
                    type="email"
                    placeholder="Email"
                    className="w-full p-4 my-4 bg-gray-900"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="w-full p-4 my-4 bg-gray-900"
                />
                {errorMessage !== null && (
                    <p className="text-red-500 font-bold text-lg py-2">
                        {errorMessage}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full p-4 my-6 bg-red-700 rounded-lg"
                    onClick={() => handleButtonClick()}
                >
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </button>
                {isSignInForm ? (
                    <>
                        <div className="login-additional py-2 m-2 text-white flex flex-row">
                            <input type="checkbox" className="mr-2" />
                            <span>Remember me</span>
                        </div>
                        <div className="sign-up-block py-2 m-2">
                            <div className="sign-up text-lg flex flex-row">
                                <span>New to Netflix?</span>
                                <button
                                    className="pl-2 font-bold"
                                    onClick={() => isSignInFormForm()}
                                >
                                    Sign up Now
                                </button>
                            </div>
                            <div className="disclaimer text-xs mt-6">
                                This page is protected by Google reCAPTCHA to
                                ensure you're not a bot.{' '}
                                <span className="text-blue-400 cursor-pointer">
                                    Learn more.
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-row">
                        <div>Already a member?</div>
                        <button
                            className="pl-2 font-bold"
                            onClick={() => isSignInFormForm()}
                        >
                            Sign In
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
