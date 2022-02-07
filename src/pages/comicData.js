

const IfEmpty = (data) => (data === '' ?  "N/A" :  data)

const ComicData = (props) => {
    let comic = props.res;
    return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-6  bg-white img-fl">
                        <img className='img-fluid ' src={comic.thumbnail?.path.replace('http','https') + "." + comic.thumbnail.extension}
                             alt=""/>
                    </div>
                    <div className="col-6">
                        <h3>{comic.title}</h3>
                        <h4 className='lead'>{IfEmpty(comic.description)}</h4>
                        <div className='row mt-4'>
                            <ul className='list-group mx-2 list-unstyled'>
                                <li><span className='fw-bold' >Upc: </span>{IfEmpty(comic.upc)}</li>
                                <li><span className='fw-bold' >DiamondCode: </span>{IfEmpty(comic.diamondCode)}</li>
                                <li><span className='fw-bold' >PageCount: </span>{IfEmpty(comic.pageCount)}</li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>

    );
};

export default ComicData;


