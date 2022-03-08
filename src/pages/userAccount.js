import React, {useEffect} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import '../App'
const UserAccount = ({userID,userInfo,logout}) => {


    const navigate = useNavigate();

    useEffect(() => {
        if (userID === "") navigate("/login")

    },[userID,userInfo])

    return (

        <div className={`container-fluid mt-4`}>

            <div className="row">
                    <p><span className='fw-bold'>Email: </span>  {userInfo.userEmail}</p>

            </div>

            <p><span className='fw-bold'>Username : </span>  {userInfo.userName}</p>

            <button type={"button"} onClick={() =>  logout()} className={'btn btn-outline-danger'}>
                Logout
            </button>
            <button type="button" className="btn btn-outline-success  ">

                <Link className = "text-black customLink" state={`/account`} to="/login">
                    Edit
                </Link>
            </button>
        </div>
    );
};

export default UserAccount;
