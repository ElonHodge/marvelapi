import React, { useEffect} from 'react';


const UserAccount = ({userID,username,logout}) => {

    useEffect(() => {
    },[userID,username])
    return (
        <div className={`container-fluid mt-4`}>
            <p><span className='fw-bold'>Email: </span>  {userID?.email}</p>
            <p><span className='fw-bold'>Username : </span>  {username}</p>
            <button type={"button"} onClick={() =>  logout()} className={'btn btn-outline-danger'}>
                Logout
            </button>
        </div>
    );
};

export default UserAccount;
