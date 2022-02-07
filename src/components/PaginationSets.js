import {Link} from "react-router-dom";

const PaginationSets = ({pages,paginate,mouseOver,click}) => {

    return (
        <nav  >

            <ul className={`pagination`}>
                <li className="page-item ">
                    <a
                        className='page-link pointerChange '
                        onClick={() => click("previous")}
                    >
                        {"<"}
                    </a>
                </li>
                {pages.map((number) => {

                    return(
                        <li  key={number} className='page-item'>
                            <a
                                href="#"
                                className={`page-link ` }
                                onClick={() => paginate(number)}
                                onMouseOver={()=> mouseOver(number)}
                            >
                                {number}
                            </a>
                        </li>
                    )
                })}
                <li className="page-item pointerChange">
                    <a
                        className={`page-link`}
                        onClick={() => click("next")}
                    >
                        {">"}
                    </a>
                </li>
            </ul>
        </nav>
    );
}


export default PaginationSets
