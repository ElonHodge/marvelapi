import './App.css'
import {spiderCharacterData as characterData} from "./spiderCharacterData"
import spiderComicData from "./spiderComicData";
import {Route, Routes} from "react-router-dom";
import {CharacterSearch} from "./pages/characterSearch";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { useEffect, useState} from "react";
import UserContext from "./contexts/UserContext";
import ComicSearch from "./pages/comicSearch";
import SignUp from "./pages/signUp";
import Favorites from "./pages/favorites";
import heart from "./images/heart.svg";
import heart_fill from "./images/heart_fill.svg";
import {initializeApp} from 'firebase/app';
import {getFirestore, doc, deleteDoc, setDoc, getDocs, collection, getDoc} from 'firebase/firestore';
import {getAuth, onAuthStateChanged,signOut} from 'firebase/auth';
import Login from "./pages/login";
import UserAccount from "./pages/userAccount";
import {useNavigate} from "react-router-dom";

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

function App() {
    const favoritesCharactersList = [];
    const [userID, setUserID] = useState("")
    const [userName,setUsername ] = useState("");
    const [favoritesCharacters, setFavoritesCharacters] = useState([]);
    const navigate = useNavigate();


    const toggleHeart = (character) => {
        if (userID !== "") {
            const doubleValidation = favoritesCharactersList.some(favCharacterID => favCharacterID.id === character.id);
            const getIndex = (element) => element.id === character.id;

            let image = document.getElementById("H" + character.id);
            if (image.src.match(heart)) {
                if (doubleValidation === false){
                    favoritesCharactersList.push(character)
                    writeToUserFavorites(character, character.id)
                    viewCollection()
                    console.log("favoritesList added")

                }
                image.src = heart_fill;

            } else {
                let index = favoritesCharactersList.findIndex(getIndex)
                favoritesCharactersList.splice(index, 1)
                image.src = heart;
                removeFromUserFavorites(character.id)
                viewCollection()
                console.log("favoritesList removed")
            }
        }
    }

    const removeFromFavorite = (character) =>{
        const getIndex = (element) => element.id === character.id;
        let index = favoritesCharactersList.findIndex(getIndex)
        favoritesCharactersList.splice(index, 1)
        removeFromUserFavorites(character.id)
        viewCollection();
        }


    const stateChange = async () => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user);
            } else {
                // User is signed out
                // ...

            }
        });


    }

    const viewCollection = async () => {
        const querySnapshot = await getDocs(collection(fireStore, "users/" + userID.uid + "/favs"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            favoritesCharactersList.push(doc.data())
        });
        setFavoritesCharacters(favoritesCharactersList)
        // console.log("view",favoritesList)

    }


    const getUserName = async () => {

        const docRef = doc(fireStore, "users/" + userID?.uid);
        const docSnap = await getDoc(docRef);

        if (userID!== ""){
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                setUsername(docSnap?.data().name)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

    }

    const writeToUserFavorites = (obj, name) => {
        const users = doc(fireStore, 'users/' + userID.uid + '/favs/' + name)
        setDoc(users, obj);

    }


    const removeFromUserFavorites = async (characterInfo) => {
        try {
            await deleteDoc(doc(fireStore, "users/" + userID.uid + "/favs", characterInfo.toString()));
        } catch (e) {
            console.log(e)
        }
    }



    const logout = async () => {
        try {
            await signOut(auth);
            setUserID("")
            setUsername('')
            navigate("/characters")
            setFavoritesCharacters([])
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        viewCollection()
        getUserName()
        stateChange()
    }, [userID,userName])

    return (
        <UserContext.Provider value={userID}>

            <div>
                <Navbar logout={logout} username={userName}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='home' element={<Home/>} />
                    <Route path='characters' element={<CharacterSearch toggleHeart={toggleHeart}
                                                                       res={characterData}
                                                                       favoritesList={favoritesCharacters}/>}/>
                    <Route path='comics' element={<ComicSearch res={spiderComicData}/>}/>
                    <Route path='signUp' element={<SignUp setUserID={setUserID}/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='account' element={<UserAccount userID={userID} username={userName} logout={logout}/>}/>
                    <Route path='favorites' element={<Favorites userID={userID}
                                                                remove={removeFromFavorite}
                    />}/>
                </Routes>
            </div>
        </UserContext.Provider>

    );
}

export default App;

