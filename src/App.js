import './App.css'
import {spiderCharacterData as characterData} from "./spiderCharacterData"
import spiderComicData from "./spiderComicData";
import {Route, Routes, useLocation} from "react-router-dom";
import {CharacterSearch} from "./pages/characterSearch";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import {useEffect, useState} from "react";
import UserContext from "./contexts/UserContext";
import ComicSearch from "./pages/comicSearch";
import SignUp from "./pages/signUp";
import Favorites from "./pages/favorites";
import heart from "./images/heart.svg";
import heart_fill from "./images/heart_fill.svg";
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail} from 'firebase/auth';
import Login from "./pages/login";
import UserAccount from "./pages/userAccount";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserAccountEdit from "./pages/userAccountEdit";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDkwb1l6sp-XKMsSpowRd-KZXuq3Wo5fQI",
    authDomain: "marvelapi-1afdc.firebaseapp.com",
    projectId: "marvelapi-1afdc",
    storageBucket: "marvelapi-1afdc.appspot.com",
    messagingSenderId: "736554199494",
    appId: "1:736554199494:web:ab7a2a04373b372b6eeac7"
});
const auth = getAuth(firebaseApp);
let counter = 0;

function App() {
    const [userID, setUserID] = useState("")
    const [userInfo, setUserInfo] = useState("");
    const [favoritesCharacters, setFavoritesCharacters] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log(counter++)

    //**Hearts**//
    const toggleHeart = (character) => {
        if (userID !== "") {
            const doubleValidation = favoritesCharacters.some(favCharacter => favCharacter.charId === character.id);
            const getIndex = (element) => element.charId === character.id;
            let image = document.getElementById("H" + character.id);
            if (image.src.match(heart)) {
                if (doubleValidation === false) {
                    postToUserFavorites(character)
                    console.log("favoritesList added")
                }
                image.src = heart_fill;

            } else {
                let index = favoritesCharacters.findIndex(getIndex);
                deleteCharacterFromUsersFavorites(favoritesCharacters[index].favId)
                favoritesCharacters.splice(index, 1)
                image.src = heart;
                console.log("favoritesList removed")
            }
        }
    }

    const deleteCharacterFromUsersFavorites = async (favId) => {
        console.log(favoritesCharacters)
        console.log(favId)
        try {
            await axios.delete("https://marveldatabasejava.herokuapp.com/api/v1/deletefav/" + favId)
        } catch (e) {
            console.log(e)
        }
        console.log(favoritesCharacters)
    }

    //** after login to get new user information **
    const userStateChange = async () => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user);

            }

        });


    }

    const viewFavorites = async () => {

        if (auth.currentUser !== null) {
            try {
                const response = await axios.get("https://marveldatabasejava.herokuapp.com/api/v1/favsbyuserid/" + userID.uid);
                setFavoritesCharacters(response.data)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const getUserId = async () => {

        if (auth.currentUser !== null) {
            try {
                const response = await axios.get("https://marveldatabasejava.herokuapp.com/api/v1/userbyid/" + userID.uid)
                setUserInfo(response.data)
            } catch (error) {
                console.error(error)
            }
        }

    }

    const postToUserFavorites = (character) => {
        try {
            axios.post('https://marveldatabasejava.herokuapp.com/api/v1/addtofavs', {
                "charId": character.id,
                "userId": userID.uid,
                "charName": character.name,
                "charImage": character.thumbnail.path,
                "imageExtenstion": character.thumbnail.extension
            }).then((res)=>{
                favoritesCharacters.push(res.data)
            })
        } catch (e) {
            console.log(e)
        }
        
        console.log(favoritesCharacters)
      


    }

    const updateUserEmail = async (email) => {
        try {
            await updateEmail(auth.currentUser, email)
            console.log("updated" + userID)
            getUserId()
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async () => {

        try {
            await signOut(auth);
            setFavoritesCharacters([])
            setUserID("")
            setUserInfo("")
            if (location.state === null) {
                navigate("/characters")
            } else {
                navigate(location.state, {replace: true})
            }
        } catch (e) {

        }
    }

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            userStateChange()
            if (location.state.toString() === "/account") {
                navigate("/accountEdit", {replace: true})

            } else {
                navigate(location.state, {replace: true})
            }

        } catch (e) {
            console.log()
        }
    }


    useEffect(() => {
        viewFavorites()
        getUserId()
        userStateChange()

    }, [userID])

    console.log(favoritesCharacters)
    return (
        <UserContext.Provider value={userID}>

            <div>
                <Navbar logout={logout} userInfo={userInfo}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='home' element={<Home/>}/>
                    <Route path='characters' element={<CharacterSearch toggleHeart={toggleHeart}
                                                                       res={characterData}
                                                                       favoritesList={favoritesCharacters}/>}/>
                    <Route path='comics' element={<ComicSearch res={spiderComicData}/>}/>

                    <Route path='signUp' element={<SignUp setUserID={setUserID}/>}/>
                    <Route path='login' element={<Login login={login}/>}/>
                    <Route path='account' element={<UserAccount userID={userID}
                                                                userInfo={userInfo} logout={logout}


                    />}/>
                    <Route path='accountEdit' element={<UserAccountEdit userID={userID}
                                                                        userInfo={userInfo} logout={logout}
                                                                        updateUserEmail={updateUserEmail}
                    />}/>
                    <Route path='favorites' element={<Favorites userID={userID}/>}/>
                </Routes>
            </div>
        </UserContext.Provider>

    );
}

export default App;

