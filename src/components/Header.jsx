import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { AVATAR, LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import lang from '../utils/languageConstants';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const langKey = useSelector((store) => store.config.lang);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid, email, displayName, photoURL }));
                navigate('/browse');
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };

    const handleSignOut = (e) => {
        signOut(auth);
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    return (
        <div className="absolute w-98 px-8 py-2 bg-gradient-to-b from-black z-20 flex flex-col md:flex-row md:flex-start items-center pt-8 text-xl text-white font-medium">
            <img className="w-44" src={LOGO} alt="Netflix logo" />
            {user?.uid && (
                <>
                    <div className="header-menu flex flex-row items-center flex-1">
                        <Link to={'/'}>
                            <div className="home menu-item mr-8">
                                {lang[langKey].home}
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className="tv-shows menu-item mr-8">
                                {lang[langKey].tvShows}
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className="movies menu-item mr-8">
                                {lang[langKey].movies}
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className="new-popular menu-item mr-8">
                                {lang[langKey].newAndPopular}
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className="my-list menu-item mr-8">
                                {lang[langKey].myList}
                            </div>
                        </Link>
                        <Link to={'/'}>
                            <div className="browse-by-lang menu-item mr-8">
                                {lang[langKey].browseByLang}
                            </div>
                        </Link>
                    </div>
                    <div className="menu-action flex flex-row items-center px-4 cursor-pointer">
                        <select
                            className="p-2 bg-gray-900 text-white mr-4"
                            onChange={handleLanguageChange}
                            value={langKey}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option
                                    value={lang.identifier}
                                    key={lang.identifier}
                                >
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <div
                            className="search menu-action-item mr-4"
                            onClick={handleGptSearchClick}
                        >
                            &#128269;
                        </div>
                        <div className="notification menu-action-item mr-4">
                            &#128276;
                        </div>
                        <div className="profile menu-action-item flex mr-4 group">
                            <img
                                src={AVATAR(user.displayName)}
                                alt={'profile'}
                                className="w-10"
                            />
                            <div className="drop-down">
                                <span className="visible group-hover:invisible">
                                    &#128315;
                                </span>
                                <span className="invisible group-hover:visible">
                                    &#128314;
                                </span>
                                <div className="drop-down-content absolute right-8 top-20 bg-black invisible group-hover:visible group-focus-within:visible cursor-pointer">
                                    <div className="item account hover:bg-gray-600 p-4">
                                        {lang[langKey].account}
                                    </div>
                                    <div className="item help hover:bg-gray-600 p-4">
                                        {lang[langKey].helpCenter}
                                    </div>
                                    <div className="item sign-out hover:bg-gray-600 p-4">
                                        <button onClick={handleSignOut}>
                                            {lang[langKey].signOutOfNetflix}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default Header;
