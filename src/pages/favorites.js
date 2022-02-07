import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import CharacterData from "./characterData";
import {initializeApp} from 'firebase/app';
import {getFirestore, getDocs, collection} from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDkwb1l6sp-XKMsSpowRd-KZXuq3Wo5fQI",
    authDomain: "marvelapi-1afdc.firebaseapp.com",
    projectId: "marvelapi-1afdc",
    storageBucket: "marvelapi-1afdc.appspot.com",
    messagingSenderId: "736554199494",
    appId: "1:736554199494:web:ab7a2a04373b372b6eeac7"
});


const fireStore = getFirestore();




const Favorites = ({remove,userID}) => {
    const [favoritesListTemp,setFavoritesListTemp] = useState([]);
    const [favoritesCharacters, setFavoritesCharacters] = useState([]);
    const [currentPageCharacter, setCurrentPageCharacter] = useState(1);
    const [charactersPerPage] = useState(20);
    const [characterData, setCharacterData] = useState();
    const [totalFavorites,setTotalFavorites ] = useState(0);
    const [characterWindow, setCharacterWindow] = useState(true);
    const indexOfLastCharacter = currentPageCharacter * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const viewCharacterFavorites = async () => {
        const querySnapshot = await getDocs(collection(fireStore, "users/" + userID.uid + "/favs"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            const duplicateValidation = favoritesListTemp.some(favCharacterID => favCharacterID.id === doc.data().id);
            if (duplicateValidation === false ){
                favoritesListTemp.push(doc.data());
                setFavoritesListTemp(favoritesListTemp)
                const currentCharacters = favoritesListTemp.slice(indexOfFirstCharacter, indexOfLastCharacter);
                setFavoritesCharacters(currentCharacters)
                setTotalFavorites(favoritesListTemp.length)
            }
        });

    }

    const removeFromCharactersFavList = (character) => {
        const getIndex = (element) => element.id === character.id;
        let index = favoritesListTemp.findIndex(getIndex)
        favoritesListTemp.splice(index, 1)
        favoritesCharacters.splice(index, 1)
        setTotalFavorites(favoritesListTemp.length)
    }

    const paginateForCharacters = pageNumber => {setCurrentPageCharacter(pageNumber)}

    useEffect(()=>{
        viewCharacterFavorites()
    },[userID])

    return(
            <div className="container-fluid">
                {
                    <p><span className='fw-bold'>Total favorites: </span> {totalFavorites}</p>
                }
                {
                    (characterWindow ?
                        <>
                            <div className="  row mt-2">

                                {
                                    favoritesCharacters.map((value => {
                                        return (
                                            <div key={value.id} className=" mx-4 col-4 col-md-2 col-lg-1 col-xl-1">
                                                <img className='favImg d-flex' onClick={()=> {
                                                    setCharacterData(value);
                                                    setCharacterWindow(false)
                                                }}
                                                     src={value.thumbnail.path.replace('http','https') + "/landscape_small." + value.thumbnail.extension}
                                                     alt=""/>

                                                <p className={`text-truncate`}>{value.name}</p>

                                            </div>
                                        )
                                    }))
                                }
                            </div>

                            <div className=" d-flex justify-content-center">
                                <Pagination
                                    postsPerPage={charactersPerPage}
                                    totalPosts={totalFavorites}
                                    paginate={paginateForCharacters}
                                />
                            </div>

                        </>
                        :
                        <>
                            <div className="d-flex bd-highlight mb-3 ">
                                <div className=" me-auto p-2 bd-highlight">
                                    <button type={"button"} onClick={()=>{
                                        remove(characterData);
                                        setCharacterWindow(true);
                                        removeFromCharactersFavList(characterData);

                                    }} className={`btn btn-outline-danger`}>Remove from favorites</button>
                                </div>
                                <div className={` justify-content-end`}>
                                    <button type="button" onClick={() => {
                                        setCharacterWindow(true);

                                    }} className="btn-close p-2" aria-label="Close">
                                    </button>

                                </div>
                            </div>
                            <CharacterData res={characterData}/>


                        </>)
                }

            </div>
    )

};

export default Favorites;
