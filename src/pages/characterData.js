import React, { useState} from 'react';
import ComicData from "./comicData";
import axios from "axios";
import close_btn from '../images/close_btn.svg'
const apiKey = "&apikey=1566f6b07d868c5b4fc755de7d49438f&"
const hash = "hash=0b9e5f3a63a2947925a056ce16a6359d"
const time = '?ts=1&'
const authorization = apiKey+hash

const ifEmpty = (data) => (data === '' ?  "N/A" :  data)


const CharacterData = (props) => {
    const [comicId, setComicId] = useState("")
    const [comicData, setComicData] = useState([])
    const getComicById = comicId + time + authorization;
    const getComicData = () => {

        const fetchComic = async () => {

            try {
                // eslint-disable-next-line no-template-curly-in-string
                const response = await axios.get(getComicById)
                setComicData(response.data.data.results)

            } catch (error) {
                console.error(error)
            }
        }

        fetchComic()
    }


    const getComicId = (comicId => setComicId(comicId.replace('http','https')))
    const closeComicData = () => setComicData([])

    let data = props.res
    return (
        <div  className='container-fluid mt-2'>
            <div className="row">
                <div className='col-4'>
                    <img  className='img-fluid' src={data.thumbnail.path.replace('http','https') + "/portrait_incredible." + data.thumbnail.extension} alt=""/>
                </div>
                <div key={data.id} className="col-8">
                    <p><span className='fw-bold'>Name: </span> {ifEmpty(data.name)}</p>
                    <p><span className='fw-bold'>Description: </span>{ifEmpty(data.description)}</p>
                    <p><span className='fw-bold' >Comics: </span>{ifEmpty(data.comics.available)}</p>
                    <p><span className='fw-bold' >Series: </span>{ifEmpty(data.series.available)}</p>
                </div>
            </div>
            { (comicData.length > 0 ?
                <div className="row">
                    <button className='d-flex justify-content-end closeBtn mt-4' onClick={closeComicData}>
                        <img src={close_btn} alt="Logo"/>
                    </button>
                    <ComicData res={comicData[0]}/>

                </div>

                : "" )}
            <div className="row mt-4">

                <div className="accordion " id="accordionExample">

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button " type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                View Comics
                            </button>
                        </h2>
                        <div  id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                             data-bs-parent="#accordionExample">
                            {
                                data.comics.items.map((value,index)=> {
                                    return(

                                        <div key={index} className="list-group">
                                            <ul className="navbar-nav" >
                                                <button type="button" onMouseEnter={() =>{getComicId(value.resourceURI)}}

                                                        onClick={ () =>{getComicData()}}
                                                        className="list-group-item list-group-item-action page-link"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                >
                                                    {value.name}
                                                </button>
                                            </ul>
                                            </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                View Series
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                             data-bs-parent="#accordionExample">
                            {
                                data.series.items.map((value)=> {
                                    return(
                                        <div key={value.name} className="list-group ">
                                            <button type={`button`} onMouseEnter={() =>{getComicId(value.resourceURI)}}
                                                    onClick={ () =>{getComicData()}}

                                                    className="list-group-item list-group-item-action page-link ">
                                                {value.name}
                                            </button>

                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>


                </div>
            </div>



        </div>
);

};

export default CharacterData;
