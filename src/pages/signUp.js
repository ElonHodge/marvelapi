import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {initializeApp} from 'firebase/app'
import {getFirestore,doc,setDoc} from 'firebase/firestore'
import { getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import personCircle  from '../images/personCircle.svg'
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDkwb1l6sp-XKMsSpowRd-KZXuq3Wo5fQI",
    authDomain: "marvelapi-1afdc.firebaseapp.com",
    projectId: "marvelapi-1afdc",
    storageBucket: "marvelapi-1afdc.appspot.com",
    messagingSenderId: "736554199494",
    appId: "1:736554199494:web:ab7a2a04373b372b6eeac7"
});
const fireStore = getFirestore();
const auth = getAuth(firebaseApp);


const SignUp = ({ setUserID }) => {
    // Once the user clicks submit, we will mimic logging in and conditionally render our nav bar.
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordHelp, setConfirmPasswordHelp] = useState('');
    const [usernameHelper,setUserNameHelper ] = useState('');
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
            case "inputPasswordConfirm":
                setConfirmPassword(e.target.value)
                break;
            case "inputUserName":
                setUsername(e.target.value)
                break;
            default:
                break

        }
    }

    useEffect(()=>{
        if (email.length > 0) {
            validateEmail();
        }

        (password.length >0 && password.length < 6 ? setPasswordHelper("Password mush be six characters long")
            : setPasswordHelper(""));

        if(password.length > 0 ){
            (password === confirmPassword
                ? setConfirmPasswordHelp('') : setConfirmPasswordHelp("Password does not match"));
        }

        if (username.length > 0) {

            (username.length > 3 ? setUserNameHelper("") : setUserNameHelper("User name mush be more than  three characters"))
        }



        if (password.length > 5 && email.length > 0 && emailHelper.length === 0
            && password === confirmPassword && username.length > 0){
            setDisable("")
        }else {
            setDisable("disabled")
        }


    },[password,passwordHelper,confirmPassword,confirmPasswordHelp,email,emailHelper,username,usernameHelper])

    const createAccount = async ( ) =>{

        try {
            const userCredential = await createUserWithEmailAndPassword (auth, email, password);
            writeToUser(username,userCredential.user.uid)
            setUserID(username)

            console.log(userCredential.user)
        }catch (error){
            console.log(error);

        }

    }

    const writeToUser = (username,uid) => {
        const users = doc(fireStore,'users/'+uid)

        const userInfo = {
            name: username,
        }

        setDoc(users, userInfo);

    }

    const handleSubmit = e => {
        e.preventDefault()

        createAccount()

        // We can use useNavigate from RR to redirect our users to a different component/page
        // DO NOT FORGET the forward / in front of path in navigate()
        navigate("/characters")
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

                        <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
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

                    <div className="mb-3">
                        <label htmlFor="inputPasswordConfirm" className="form-label"> Confirm Password</label>
                        <input type="password" className="form-control" id="inputPasswordConfirm"
                               onChange={handleChange}
                        />
                        <div id="passwordConfirmHelp" className="form-text">
                            <span style={{color:"red"}}>{confirmPasswordHelp}</span></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputUserName" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="inputUserName"
                               onChange={handleChange}
                        />
                        <div id="inputUserNameHelp" className="form-text">
                            <span style={{color:"red"}}>{usernameHelper}</span>
                        </div>
                    </div>
                        <div className="col d-flex justify-content-center">
                            <button type="submit" className={`btn btn-primary ${disable}`}>Sign Up</button>
                        </div>
                </form>
                    </div>
                </div>
            </div>
            </div>

        </div>

    );
}

export default SignUp;
