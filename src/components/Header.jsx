import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = (e) => {
        signOut(auth)
            .then((data) => {
                console.log('Sign out successful', data);
                navigate('/');
            })
            .catch((error) => {
                console.error('Sign out error', error);
            });
    };

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex flex-start pt-8 text-xl text-white font-medium">
            <img
                className="w-44"
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="Netflix logo"
            />
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
                                src={
                                    'https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABaSDR-kTPhPYcVVGSsV0jC3D-Q5HZSFE6fjzAM-4cMpltx1Gw9AV7OTnL8sYnC6CBxOBZQEAJLjStt822uD2lctOvNR05qM.png?r=962'
                                }
                                alt={'profile picture'}
                                className=""
                            />
                            <div className="drop-down">
                                <span className="visible group-hover:invisible">
                                    &#128315;
                                </span>
                                <span className="invisible group-hover:visible">
                                    &#128314;
                                </span>
                                <div className="drop-down-content absolute right-8 top-8 bg-black invisible group-hover:visible group-focus-within:visible cursor-pointer">
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
