import React, {useEffect, useState} from 'react';
import enterBtn from '../images/enterBtn.png'
import marvelLogo from '../images/marvelLogo.png'
import {Link} from "react-router-dom";
import {movieQuotes} from "../movieQuotes";
const Home = () => {

     const [quotes,setQuotes ] = useState(movieQuotes[0]);

    const quoteGenerator = () => {
        let randomNumber = Math.ceil(Math.random() * movieQuotes.length)
        console.log(randomNumber)
        setQuotes(movieQuotes[randomNumber])
    }


    useEffect(()=>{
        setTimeout(quoteGenerator,3000);
    },[quotes])

    return (
        <div>
            <div className=" container-fluid text-white  bg-black">

                <div className='row justify-content-center '>
                    <div className="d-flex row ">
                        <img className='img-fluid' src={marvelLogo}
                             alt=""/>
                    </div>
                    <div className="row">
                        <h1 className="display-4 fst-italic"><span style={{color: "blue"}}>
                            {quotes?.Title}
                        </span>

                        </h1>
                        <p className="lead my-3 ">{quotes?.text}</p>
                        <div className="d-flex justify-content-center">
                            <Link className="nav-link " to='/characters'> <img className={`img-fluid`} src={enterBtn} alt="Logo"/></Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};


export default Home;
