import React, {useEffect, useState} from 'react';
import CharacterData from "./characterData";
import axios from "axios";
import Pagination from "../components/Pagination";
import PaginationSets from "../components/PaginationSets";
import heart from '../images/heart.svg'
import heart_fill from '../images/heart_fill.svg'
import {Link, useLocation, useNavigate} from "react-router-dom";
import personCircleWhite from "../images/personCircleWhite.svg";
const apiKey = "&apikey=1566f6b07d868c5b4fc755de7d49438f&"
const hash = "hash=0b9e5f3a63a2947925a056ce16a6359d"
const base = "https://gateway.marvel.com/v1/public/"
const time = '?ts=1&'
const limit = "&limit=100"
const authorization = apiKey+hash
const characters = 'characters'




const CharacterSearch = ({res,toggleHeart,favoritesList,userID}) => {
    const pageNumbers = []
    const [offSet, setOffSet] = useState(0);
    const data = res.data?.results;
    const [currentPage, setCurrentPage] = useState(1);
    const [, setCollectionSet] = useState(1);
    const [charactersPerPage] = useState(20);
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const [characterData, setCharacterData] = useState(data[0])
    const [userInput, setUserInput] = useState('')
    const [characterFilter, setCharacterFilter] = useState('nameStartsWith=')
    const [orderBy, setOrderBy] = useState('&orderBy=name')
    const [loading, setLoading] = useState(false)
    const [error,setError ] = useState("");
    const [apiData, setApiData] = useState(res);
    const [numberSet, setNumberSet] = useState(1);
    const [buttonsNumSet, setButtonsNumSet] = useState([])
    const [count,setCount] = useState(Math.ceil(apiData.data.total / 100));
    const navigate = useNavigate();
    const location = useLocation();


    let characterSearch = `${base}${characters}${time}${characterFilter}${userInput}${orderBy}${limit}&offset=${offSet}${authorization}`

    const fetchCharacter = async () => {
        setLoading(true)
        try {
            const response = await axios.get(characterSearch)
            setApiData(response.data);
            setCount(Math.ceil(response.data.data.total/100))
            if (response.data.data.total > 0) setCharacterData(response.data.data.results[0])
            setLoading(false)
            setError("")
            showFavorites()

        } catch (error) {
            console.error(error)
            setLoading(false)
            setError("error")

        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setCurrentPage(1)
        setNumberSet(1)

        fetchCharacter()
    }

    const handleChange = (e) => {
        setUserInput(e.target.value)
        switch (e.target.id) {
            case "nameStartsWithCkb":
                setCharacterFilter("nameStartsWith=")
                break;
            case "NameExactCkb":
                setCharacterFilter("name=")
                break;
            case "nameAscendingCkb":
                setOrderBy("&orderBy=name")
                break;
            case "NameDescendingCkb":
                setOrderBy("&orderBy=-name")
                break;
            default:
                break;
        }
    }

    const getCharacterData = (data) => {
        setCharacterData(data)
    }

    const mouseOver = (collectionNumber) => {
        if (collectionNumber === 1) {
            setOffSet(0)
            setCollectionSet(collectionNumber)
        }
        if (collectionNumber > 1) {
            setCollectionSet(collectionNumber)
            setOffSet((collectionNumber - 1) * 100)

        }
    }

    const paginate = pageNumber => {
        setCurrentPage(pageNumber)

    }

    const changeSet = (button) => {
        if (button === "next") setNumberSet(numberSet < setCount ? numberSet + 1 : numberSet)
        if (button === "previous") setNumberSet(numberSet > 1 ? numberSet - 1 : numberSet)
    }

    const paginateSets = () => {
        setCurrentPage(1)
        fetchCharacter()
    }

    const showLoading = () => {
        return loading ? <h3 className={`d-flex justify-content-center`}>
            <img width={`100`} src={`https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif`}
                 alt={`spinning loading circle`}/>
            loading
        </h3> : showError()
    }

    const showError = () => {
        return error ? <h3> <span style={{color:"red"}}>error please try again</span> </h3> : ''
    }


    const showModal = () =>{
        return(
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login Required</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className='text-center'>
                                Sign up or login in to unlocked more features.
                            </p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">
                                Close</button>
                        </div>
                    </div>
                </div>
            </div>
            )

    }

    const currentCharacter = apiData.data.results.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const formLayout = () => <form onSubmit={handleSubmit}>
        <div className="input-group">
            <button className="btn  border" type="button" data-toggle="collapse" data-target="#collapseExample"
                    aria-expanded="false" aria-controls="collapseExample">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-filter" viewBox="0 0 16 16">
                    <path
                        d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
                Filters
            </button>
            <input type="search" onChange={handleChange} className="form-control"
                   placeholder="Search by character's name "
                   aria-label="Recipient's username" aria-describedby="basic-addon2"
                   id='userInput'
                   name='userInput'
                   value={userInput}
            />
            <div className="input-group-append">
                <button className="btn border  bg-white" type="button" onClick={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div className="collapse" id="collapseExample">
            <div className="row">
                <div className="col-6 col-md-4">
                    Character options
                    <hr style={{width: "130px"}}>

                    </hr>
                    <div className="col">
                        <input onChange={handleChange} className="form-check-input mx-2 "
                               type="radio" value={userInput} name={"character"} id="nameStartsWithCkb"/>

                        <label className="form-check-label" data-toggle="collapse"
                               htmlFor="defaultCheck1"> Name Starts With
                        </label>

                    </div>
                    <div className="col">
                        <input onChange={handleChange} className="form-check-input mx-2 "
                               data-target="#collapseExample" type="radio" value={userInput} name={"character"}
                               id="NameExactCkb"/>

                        <label className="form-check-label " data-toggle="collapse"
                               htmlFor="defaultCheck1"> Name exact
                        </label>

                    </div>
                </div>

                <div className="col-6 col-md-4">
                    Order options
                    <hr style={{width: "100px"}}>

                    </hr>
                    <div className="col">
                        <input onChange={handleChange} className="form-check-input mx-2 "
                               type="radio" value={userInput} name={"order"}
                               id="nameAscendingCkb"/>

                        <label className="form-check-label " data-toggle="collapse"
                               htmlFor="defaultCheck1"> Name ascending
                        </label>

                    </div>
                    <div className="col">
                        <input onChange={handleChange} className="form-check-input mx-2 "
                               data-target="#collapseExample" type="radio" value={userInput} name={"order"}
                               id="NameDescendingCkb"/>

                        <label className="form-check-label " data-toggle="collapse"
                               htmlFor="defaultCheck1"> Name descending
                        </label>

                    </div>
                </div>
            </div>
        </div>
    </form>

    const characterSearchLayout = () => <div className='row'>
            <div className='col-6 col-sm-6 col-md-6 col-lg-6 '>
                {
                    (currentCharacter.length > 0 ?

                        <div>
                            {showLoading()}

                            <div className="col">
                                <div className="row">
                                    <p><span className='fw-bold'>Total results :</span>{apiData.data.total} </p>
                                </div>
                            </div>
                            {
                                currentCharacter.map((value => {
                                    return (

                                        <div key={value.id} className="  row mt-2 CharacterData">

                                            <div className="col-6 col-md-3 mr-4 ">
                                                <img className='portraitImg d-flex img-fluid float-left b '
                                                     src={value.thumbnail.path.replace('http','https') + "/landscape_small." + value.thumbnail.extension}
                                                     alt="" onClick={() => {
                                                    getCharacterData(value)
                                                }}/>

                                            </div>
                                            <div className="col-12 col-md-9  align-self-center ">
                                                <h4 className="text-truncate  ">{value.name}</h4>
                                                <div className="row">
                                                    <div className="col-2 ">
                                                        {/*Hears*/}
                                                        <button type={"button"} className={`btnClear`}
                                                                data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            <img id={"H" + value.id} src={heart} alt={`heart`}
                                                                 onClick={() => {
                                                                     // eslint-disable-next-line no-unused-expressions
                                                                      (userID !== "" ? toggleHeart(value) : "")

                                                                 }}/>
                                                        </button>
                                                        { userID !=="" ? "" : showModal()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))
                            }
                        </div>
                        :
                        <div>

                            {showLoading()}
                            <h1> No results found</h1>
                        </div>)
                }

                <div className="mt-4 d-flex justify-content-center">
                    <Pagination
                        postsPerPage={charactersPerPage}
                        totalPosts={apiData.data.results.length}
                        paginate={paginate}
                    />
                </div>

            </div>
            {
                (currentCharacter.length > 0 ?
                    characterDataLayout()
                    : "")
            }

        </div>

    const characterDataLayout = () => <div className="col-6 border">
            <div className=" position-sticky  " style={{top: "2rem"}}>

                <CharacterData res={characterData}/>

            </div>

        </div>

    const paginateSetsLayout = () => <div>
        { (apiData.data.total > 100?
            <div >
                <p><span className="fw-bold">Set count:</span> {count}</p>
                <p><span className="fw-bold"> Max Results per set :</span>100</p>
                <div className={`d-flex justify-content-center`}>
                    <PaginationSets
                        pages={buttonsNumSet}
                        paginate={paginateSets}
                        mouseOver={mouseOver}
                        click={changeSet}
                    />
                </div>

            </div>:"" )}
        </div>

    const showFavorites = () => {
        if (favoritesList.length > 0){
            for (let i = 0; i  < favoritesList.length ; i++) {
                let image =  document.getElementById("H"+favoritesList[i].charId);
                if (image != null){
                    image.src = heart_fill;
                }
            }}else {
            let data = apiData.data.results;
            for (let i = 0; i  < data.length ; i++) {
                let image =  document.getElementById("H"+data[i].id);
                if (image != null){
                    image.src = heart;
                }

            }
        }


    }


    useEffect(() => {
            showFavorites()
        let tempNumberOfPages;

        if (count > 0 ){
            for (let i = 1; i <= count; i++) {
                pageNumbers.push(i);
            }
        }

        if (pageNumbers.length <= 10) {
            tempNumberOfPages = [...pageNumbers]
        }

        else if (numberSet === 1) {
            tempNumberOfPages = [...pageNumbers.slice(0,10)]

        }

        if (numberSet > 1 && numberSet <= count){
            tempNumberOfPages = [...pageNumbers.slice((numberSet-1)*10,numberSet*10)]

        }

        setButtonsNumSet(tempNumberOfPages);
        setCurrentPage(currentPage);
        setNumberSet(numberSet);
    }, [count,numberSet,favoritesList])
        
    return (

    <div className='container-fluid'>

        {loading ? "": formLayout()}

        {characterSearchLayout()}

        {paginateSetsLayout()}
    </div>

    );
};



export  {CharacterSearch};

