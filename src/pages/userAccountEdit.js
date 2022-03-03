import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import '../App'
import axios from "axios";
const UserAccountEdit = ({userID,userInfo,updateUserEmail}) => {


    const [userInputName, setUserInputName] = useState(userInfo.userName)
    const [userInputEmail, setUserInputEmail] = useState(userInfo.userEmail)
    const navigate = useNavigate();



    const updateUser = async () => {

        await axios.put('http://localhost:8080/api/v1/updateuser/'+userID.uid, {
            "userId": userID.uid,
            "userName": userInputName,
            "userEmail": userInputEmail,
        })
    }

    const handleChange = (e) => {
        e.target.id === 'userInputEmail' ?
            setUserInputEmail(e.target.value) : setUserInputName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        updateUserEmail(userInputEmail)
        updateUser().then(navigate("/account",{replace:true})
        )


    }

    const cancelButton = () =>{navigate("/account", {replace: true})}


    const formLayout = () =>
        <form className="row g-3 form-control-sm. mt-4 " onSubmit={handleSubmit}>

            <div className='row'>
            <div className="col-auto ">
            <h4>Email: </h4>
        </div>
            <div className="col-auto ">
                <input type="input"  onChange={handleChange}
                       placeholder="Update Email "
                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                       id='userInputEmail'
                       name='userInput'
                       value={userInputEmail}/>
            </div>
            </div>
            <div className='row'>
                <div className="col-auto ">
                    <h4>Username: </h4>
                </div>
                <div className="col-auto ">
                    <input type="input"  onChange={handleChange}
                           placeholder="Update Username "
                           aria-label="Recipient's username" aria-describedby="basic-addon2"
                           id='userInputName'
                           name='userInput'
                           value={userInputName}/>
                </div>
            </div>
            <div className="col-auto ">
                <div className="input-group-append">
                    <button className="btn btn-outline-success " type="button" onClick={handleSubmit}>
                        Update
                    </button>
                    <button className={`btn btn-outline-danger mx-2`} type={`button`} onClick={cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>

    </form>

    useEffect(() => {
    },[userID,userInfo])




    return (

        <div className={`container-fluid `}>

            {formLayout()}

        </div>
    );
};

export default UserAccountEdit;
