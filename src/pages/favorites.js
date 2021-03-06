import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import CharacterData from "./characterData";
import axios from "axios";
import {baseCharacters,authorization} from "../apiInfo";
import {useNavigate} from "react-router-dom";




const Favorites = ({userID,favoritesList,deleteFromFavorites}) => {
    const [favoritesListTemp,] = useState([]);
    const [favoritesCharacters, setFavoritesCharacters] = useState([]);
    const [favoritesId, setFavoritesId] = useState();
    const [currentPageCharacter, setCurrentPageCharacter] = useState(1);
    const [charactersPerPage] = useState(20);
    const [characterData, setCharacterData] = useState("");
    const [totalFavorites,setTotalFavorites ] = useState(0);
    const [characterWindow, setCharacterWindow] = useState(true);
    const indexOfLastCharacter = currentPageCharacter * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const navigate = useNavigate();

    const fetchCharacterData = async (characterId) => {
        try {
            const response = await axios.get(`${baseCharacters}${characterId}?ts=1&${authorization}`)
            setCharacterData(response.data.data.results[0]);
            setCharacterWindow(false)

        } catch (error) {
            console.error(error)
        }
    }

    const viewCharacterFavorites = () =>{
            favoritesListTemp.push(...favoritesList)
                                const currentCharacters = favoritesListTemp.slice(indexOfFirstCharacter, indexOfLastCharacter);
                                setFavoritesCharacters(currentCharacters)
                                setTotalFavorites(favoritesListTemp.length)
        }

    const removeFromCharactersFavList = (character) => {
        console.log(character)
        const getIndex = (element) => element.charId === character.id;
        let index = favoritesListTemp.findIndex(getIndex)
        favoritesListTemp.splice(index, 1)
        favoritesCharacters.splice(index, 1)
        setTotalFavorites(favoritesListTemp.length)
        deleteFromFavorites(favoritesId,index)
    }

    const paginateForCharacters = pageNumber => {setCurrentPageCharacter(pageNumber)}
    useEffect(()=>{
        if (userID === "") navigate("/login")
        viewCharacterFavorites()
    },[userID,favoritesList])
    
    
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
                                            <div key={value.charId} className=" mx-4 col-4 col-md-2 col-lg-1 col-xl-1">
                                                <img className='favImg d-flex' onClick={()=> {
                                                    fetchCharacterData(value.charId)
                                                    setFavoritesId(value.favId);}}

                                                     src={value.charImage.replace('http','https') + "/landscape_small." + value.imageExtenstion}
                                                     alt=""
                                                    />

                                                <p className={`text-truncate`}>{value.charName}</p>

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
