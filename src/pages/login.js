import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import personCircle  from '../images/personCircle.svg'

const Login = ({login,userID}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');
    const [emailHelper,setEmailHelper] = useState('')
    const [disable,setDisable] = useState('disabled')
    const navigate = useNavigate();

    const validateEmail = () => {
        (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)?
            setEmailHelper(""): setEmailHelper("Invalid email address"));
    }

    const handleChange = e => {
        switch (e.target.id) {
            case "inputEmail":
                setEmail(e.target.value)
                break;
            case "inputPassword":
                setPassword(e.target.value)
                break;
            default:
                break

        }
    }



    useEffect(()=>{

        if (userID !== "") navigate("/favorites")

                if (email.length > 0) {
            validateEmail();
        }

        if (password.length > 5 && email.length > 0 && emailHelper.length === 0){
            setDisable("")
        }else {
            setDisable("disabled")
        }


    },[email,emailHelper,passwordHelper,password,disable,userID])

    const handleSubmit = e => {
        e.preventDefault()
        login(email,password)

    }
    return (
        <div className={`container  mt-4 `}>
            <div className="row  ">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <div className={`d-flex justify-content-center`}>
                                <img src={personCircle} alt="silhouette of a portrait"/>

                            </div>

                            <h5 className="card-title text-center mb-5 fw-light fs-5">Login</h5>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="inputEmail"
                                           aria-describedby="emailHelp"
                                           onChange={handleChange}
                                    />
                                    <div id="emailHelper" className="form-text">
                                        <span style={{color:"red"}}>{emailHelper}</span></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="inputPassword"
                                           onChange={handleChange}
                                    />
                                    <div id="passwordHelp" className="form-text">
                                        <span style={{color:"red"}}>{passwordHelper}</span></div>
                                </div>

                                <div className="col d-flex justify-content-center">
                                    <button type="submit"  className={`btn btn-primary ${disable}`}>Login</button>
                                </div>
                            </form>
                            <ul className={`navbar-nav mt-3 `}>
                                <li className="nav-item ">
                                    <Link className="nav-link list-unstyled " to='/signUp'> <span
                                        className="sr-only">Create account </span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Login;
