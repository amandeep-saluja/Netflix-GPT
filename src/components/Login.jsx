import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { AVATAR, BACKGROUND_IMG } from '../utils/constants';
import lang from '../utils/languageConstants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const langKey = useSelector((store) => store.config.lang);
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
                    {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}{' '}
                </div>
                {!isSignInForm && (
                    <input
                        ref={fullName}
                        type="text"
                        placeholder={lang[langKey].fullNamePlaceholder}
                        className="w-full p-4 my-4 bg-gray-900"
                    />
                )}
                <input
                    ref={email}
                    type="email"
                    placeholder={lang[langKey].emailPlaceholder}
                    className="w-full p-4 my-4 bg-gray-900"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder={lang[langKey].passwordPlaceholder}
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
                    {isSignInForm ? lang[langKey].signIn : lang[langKey].signUp}{' '}
                </button>
                {isSignInForm ? (
                    <>
                        <div className="login-additional py-2 m-2 text-white flex flex-row">
                            <input type="checkbox" className="mr-2" />
                            <span>{lang[langKey].rememberMe}</span>
                        </div>
                        <div className="sign-up-block py-2 m-2">
                            <div className="sign-up text-lg flex flex-row">
                                <span>{lang[langKey].newToNetflix}</span>
                                <button
                                    className="pl-2 font-bold"
                                    onClick={() => isSignInFormForm()}
                                >
                                    {lang[langKey].signUpNow}
                                </button>
                            </div>
                            <div className="disclaimer text-xs mt-6">
                                {lang[langKey].disclaimer + ' '}
                                <span className="text-blue-400 cursor-pointer">
                                    {lang[langKey].learnMore}
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-row">
                        <div>{lang[langKey].alreadyAMember}</div>
                        <button
                            className="pl-2 font-bold"
                            onClick={() => isSignInFormForm()}
                        >
                            {lang[langKey].signIn}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
