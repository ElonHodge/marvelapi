import React, {useEffect, useState} from 'react';
import axios from "axios";
import ComicData from "./comicData";
import close_btn from "../images/close_btn.svg";
import Pagination from "../components/Pagination";
import PaginationSets from "../components/PaginationSets";

const apiKey = "&limit=100&apikey=1566f6b07d868c5b4fc755de7d49438f&"
const hash = "hash=0b9e5f3a63a2947925a056ce16a6359d"
const base = "https://gateway.marvel.com/v1/public/"
const time = '?ts=1&'
const authorization = apiKey+hash
const comic = "comics"
const title = "titleStartsWith="
const limit = "&limit=100"

const ComicSearch = ({res}) => {
    const pageNumbers = []

    const dataComic = res;
    const [offSet,setOffSet ] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage] = useState(20);
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const [,setCollectionSet ] = useState(1);
    const [loading, setLoading] = useState(false)
    const [showData,setShowData] = useState(false);
    const [comicSearchData, setComicSearchData] = useState(dataComic)
    const [comicData, setComicData] = useState([])
    const [userInput, setUserInput] = useState('')
    const [orderBy,setOrderBy] = useState('&orderBy=title')
    const [setCount,setSetCount ] = useState( Math.ceil((comicSearchData.data.total / 100)));
    const [numberSet, setNumberSet] = useState(1);
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
    const comicSearch = `${base}${comic}${time}${title}${userInput}${orderBy}${limit}&offset=${offSet}${authorization}`;


    const fetchCharacter = async () => {
        setLoading(true)
        try {
            const response = await axios.get(comicSearch)
            setComicSearchData(response.data)
            setSetCount( Math.ceil((response.data.data.total / 100)))
            setLoading(false)

        } catch (error) {
            console.error(error)
            setLoading(false)

        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        fetchCharacter()

        setCurrentPage(1)
        setNumberSet(1)
        // navigate("/");

    }

    const handleChange = (e) => {
        setUserInput(e.target.value)
        // console.log(offSet)
        switch (e.target.id){
            case "titleAscendingCkb":
                setOrderBy('&orderBy=title')
                break;
            case "issueNumberAscendingCkb":
                setOrderBy('&orderBy=issueNumber')
                break;
            case "issueNumberDescendingCkb":
                setOrderBy('&orderBy=-issueNumber')
                break;
            default:
                break;
        }
    }

    const mouseOver = (setNumber) => {
        if (setNumber <= 1 ) {
            setOffSet(0)
            setCollectionSet(setNumber)
        }
        if (setNumber > 1){
            setCollectionSet(setNumber)
            setOffSet((setNumber-1) * 100)

        }
    }

    const showComicData = (comicData) => {
        setShowData(true);
        setComicData(comicData)

    }

    const closeComicData = () => {
        setShowData(false)
    }

    const paginate = pageNumber =>{
        setCurrentPage(pageNumber);
    }

    const paginateSets = () =>{
        setCurrentPage(1)
        setNumberSet(1)
        fetchCharacter()}

    const showComicSearch = ()=>{
        if (currentComics.length > 0){
            return ( currentComics.map(comics =>
            {
                return(
                <div key={comics.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2 mt-2 ">
                    <div className="card" style={{width: '168px'}}>
                        <img  onClick={()=>{showComicData(comics)}} className='img-fluid '
                              src={comics.thumbnail?.path.replace('http','https')
                            + "/portrait_fantastic." + comics.thumbnail.extension}
                              alt=""/>
                        <p> {comics.title}

                        </p>

                    </div>

                </div>
                    )
            }))

        }else {
            return <h1> No results found</h1>
        }
    }

    const changeSet = (button) => {
        if (button === "next") {
            if (numberSet < setCount) {
                setNumberSet(numberSet + 1);
                fetchCharacter()
            } else {
                setNumberSet(numberSet)
            }
        }
        if (button === "previous") {
            if (numberSet > 1) {
                setNumberSet(numberSet - 1);
                fetchCharacter()
            } else {
                setNumberSet(numberSet)
            }
        }
    }

    const showLoading = () => {
       return loading? <h3 className={`d-flex justify-content-center`}>
           <img  width={`100`} src={`https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif`} alt={`spinning loading circle`}/>

       </h3>  : ""
    }


    const closeBtnLayout = <button className='d-flex justify-content-end closeBtn mt-4' onClick={closeComicData}>
        <img src={close_btn} alt="Logo"/>
    </button>

    const currentComics = comicSearchData.data.results.slice(indexOfFirstCharacter,indexOfLastCharacter);



    useEffect(() => {

        let tempNumberOfPages;

        if (setCount > 0 ){
            for (let i = 1; i <= setCount; i++) {
                pageNumbers.push(i);
            }
        }

        tempNumberOfPages = [...arrOfCurrButtons]

        if (pageNumbers.length <= 10) {
            tempNumberOfPages = [...pageNumbers]
        }
        else if (numberSet === 1) {
            tempNumberOfPages = [...pageNumbers.slice(0,10)]

        }

        if (numberSet > 1 && numberSet <= Math.ceil(setCount/10)){
            tempNumberOfPages = [...pageNumbers.slice((numberSet-1)*10,numberSet*10)]

        }

        setArrOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentPage);
        setNumberSet(numberSet);
    }, [setCount,numberSet])

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <button className="btn  border"  type="button" data-toggle="collapse" data-target="#collapseExample"
                            aria-expanded="false" aria-controls="collapseExample">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-filter" viewBox="0 0 16 16">
                            <path
                                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        Filters
                    </button>
                    <input type="search"  onChange={handleChange} onMouseOver={ () => mouseOver(1)} className="form-control" placeholder="Search by comic's title "
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
                            Order options
                            <hr style={{width:"100px"}}>

                            </hr>
                            <div className="col">
                                <input  onChange={handleChange} className="form-check-input mx-2 "
                                        data-target="#collapseExample"  type="radio"  value={userInput} name={"order"}
                                        id="titleAscendingCkb"/>

                                <label className="form-check-label "  data-toggle="collapse"
                                       htmlFor="defaultCheck1"> Title ascending
                                </label>

                            </div>
                            <div className="col">
                                <input onChange={handleChange}  className="form-check-input mx-2 "
                                       type="radio"  value={userInput} name={"order"}
                                       id="issueNumberAscendingCkb"/>

                                <label className="form-check-label "  data-toggle="collapse"
                                       htmlFor="defaultCheck1"> Issue number ascending
                                </label>

                            </div>
                            <div className="col">
                                <input  onChange={handleChange} className="form-check-input mx-2 "
                                        data-target="#collapseExample"  type="radio"  value={userInput} name={"order"}
                                        id="issueNumberDescendingCkb"/>

                                <label className="form-check-label "  data-toggle="collapse"
                                       htmlFor="defaultCheck1"> Issue number descending
                                </label>

                            </div>
                        </div>
                    </div>
                </div>

            </form>
                <div className="row">
                    {
                        showData ? <> {closeBtnLayout}

                                <ComicData res={comicData}/></> :
                            <>
                                {showLoading()}
                                <p> <span className='fw-bold'>Total results: </span>{comicSearchData.data.total}</p>
                                {showComicSearch()}
                                <div className="d-flex justify-content-center">
                                <Pagination
                                    postsPerPage={charactersPerPage}
                                    totalPosts={comicSearchData.data.results.length}
                                    paginate={paginate}
                                />
                                </div>
                                {comicSearchData.data.total > 100?
                                    <div className='row'>

                                        <p><span className="fw-bold">Set count:</span>
                                            {Math.ceil(comicSearchData.data.total/100)}
                                        </p>

                                        <p><span className="fw-bold"> Max Results per set :</span>100</p>

                                        <PaginationSets
                                            pages={arrOfCurrButtons}
                                            totalCount={setCount}
                                            paginate={paginateSets}
                                            mouseOver={mouseOver}
                                            click={changeSet}
                                        />
                                    </div> : ""
                                }
                            </>
                    }
                </div>
        </div>
    );
};







export default ComicSearch;
