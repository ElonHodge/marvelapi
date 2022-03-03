import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useLocation,} from 'react-router-dom'
import {initializeApp} from 'firebase/app';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import personCircle  from '../images/personCircle.svg'
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDkwb1l6sp-XKMsSpowRd-KZXuq3Wo5fQI",
    authDomain: "marvelapi-1afdc.firebaseapp.com",
    projectId: "marvelapi-1afdc",
    storageBucket: "marvelapi-1afdc.appspot.com",
    messagingSenderId: "736554199494",
    appId: "1:736554199494:web:ab7a2a04373b372b6eeac7"
});
const auth = getAuth(firebaseApp);


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');
    const [emailHelper,setEmailHelper] = useState('')
    const [disable,setDisable] = useState('disabled')
    const navigate = useNavigate();
    const location = useLocation();

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




    const  login = async () => {


        try {
             await signInWithEmailAndPassword(auth, email, password);
            if (location.state.toString() === "/account"){
                navigate("/accountEdit",{replace:true})
            }else {

                navigate(location.state, {replace:true})
            }

        } catch (e) {
            setPasswordHelper("Email/Password combination not valid")
            console.log()
        }
    }

    useEffect(()=>{
        if (email.length > 0) {
            validateEmail();
        }

        if (password.length > 5 && email.length > 0 && emailHelper.length === 0){
            setDisable("")
        }else {
            setDisable("disabled")
        }


    },[email,emailHelper,passwordHelper,password,disable])

    const handleSubmit = e => {
        e.preventDefault()
        login()

    }

    // stateChange()
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
