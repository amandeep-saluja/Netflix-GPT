import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { AVATAR, LOGO } from '../utils/constants';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
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

    const handleSignOut = (e) => {
        signOut(auth);
    };

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex flex-start pt-8 text-xl text-white font-medium">
            <img className="w-44" src={LOGO} alt="Netflix logo" />
            {user?.uid && (
                <>
                    <div className="header-menu flex flex-row items-center flex-1">
                        <Link>
                            <div className="home menu-item mr-8">Home</div>
                        </Link>
                        <Link>
                            <div className="tv-shows menu-item mr-8">
                                TV Shows
                            </div>
                        </Link>
                        <Link>
                            <div className="movies menu-item mr-8">Movies</div>
                        </Link>
                        <Link>
                            <div className="new-popular menu-item mr-8">
                                New & Popular
                            </div>
                        </Link>
                        <Link>
                            <div className="my-list menu-item mr-8">
                                My List
                            </div>
                        </Link>
                        <Link>
                            <div className="browse-by-lang menu-item mr-8">
                                Browse by Languages
                            </div>
                        </Link>
                    </div>
                    <div className="menu-action flex flex-row items-center px-4">
                        <div className="search menu-action-item mr-4">
                            &#128269;
                        </div>
                        <div className="notification menu-action-item mr-4">
                            &#128276;
                        </div>
                        <div className="profile menu-action-item flex mr-4 cursor-pointer group">
                            <img
                                src={AVATAR(user.displayName)}
                                alt={'profile picture'}
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
                                        Account
                                    </div>
                                    <div className="item help hover:bg-gray-600 p-4">
                                        Help Center
                                    </div>
                                    <div className="item sign-out hover:bg-gray-600 p-4">
                                        <button onClick={handleSignOut}>
                                            Sign out of Netflix
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
