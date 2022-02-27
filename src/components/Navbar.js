import React, {useEffect} from 'react';
import {Link,useLocation} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../contexts/UserContext";
import personCircleWhite from '../images/personCircleWhite.svg'

const Navbar = ({logout,username}) => {
    const user = useContext(UserContext)
    const location = useLocation();

    useEffect(() => user,[user])
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-black ">
                <Link className="navbar-brand mx-2 " to='home'>
                <img src={'https://wallpapercave.com/wp/wp2700196.png'}
                     width="70" height="30"
                     className="d-inline-block align-top text-white" alt="alt "/>
            </Link>
            <button className="navbar-toggler bg-white" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">

                </span>
            </button>

            <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    <li className="nav-item    ">
                        <Link className="nav-link text-white " to='characters'> <span
                            className="sr-only">Characters</span></Link>
                    </li>
                    <li className="nav-item  ">
                        <Link className="nav-link text-white  " to='comics'> <span
                            className="sr-only">Comics</span></Link>
                    </li>
                    {user ? <li className="nav-item ">
                            <Link className="nav-link text-white" to="favorites">Favorites</Link>
                        </li> : "" }

                </ul>

                            {
                                !user ?
                                    <ul className={`navbar-nav`}>
                                        <li className="nav-item " >
                                                <Link className = "nav-link text-white `nav-link" state={location.pathname} to="login">
                                                    <img src={personCircleWhite} alt="person portrait"/>
                                                    {" Login"}
                                                </Link>
                                        </li>
                                    </ul>

                                    :
                                            <div className=' nav-item dropdown  '>
                                                <button className="btn btn-outline-light dropdown-toggle" type="button"
                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    {"  "+username }
                                                </button>

                                                <ul className="dropdown-menu dropdown-menu-md-end" aria-labelledby="dropdownMenuButton1">
                                                    <li> <Link className = " nav-link text-black dropdown-item" to="account">
                                                        To account
                                                    </Link></li>
                                                     <button type={"button"} onClick={() =>  logout()}
                                                             className='btn btn-outline-danger w-100'>
                                                        Logout
                                                    </button>
                                                </ul>

                                            </div>
                            }

                </div>
        </nav>
    );
};

export default Navbar;
