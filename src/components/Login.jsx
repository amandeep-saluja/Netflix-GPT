import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const isSignInFormForm = () => {
        console.log('Sign up form clicked');
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
                    console.log(user);
                    updateProfile(user, {
                        displayName: fullName?.current?.value,
                        photoURL: 'https://example.com/jane-q-user/profile.jpg',
                    }).then(() => {
                        const { uid, email, displayName, photoURL } =
                            auth.currentUser;
                        dispatch(
                            addUser({ uid, email, displayName, photoURL })
                        );
                        navigate('/browse');
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
                    console.log(user);
                    navigate('/browse');
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
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_large.jpg"
                    alt="Background"
                />
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
