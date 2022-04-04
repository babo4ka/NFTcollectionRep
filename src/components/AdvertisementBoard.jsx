import './css/AdvertisementBoard.scss'

import { AdObjects } from '../utils/AdObjects';

const AdvertisementBoard = ()=>{

    const adObjects = AdObjects().objects;

    const Ad = (props)=>{
        const className = props.i==0?"carousel-item mb-3 active":"carousel-item mb-3"
        return(
            <div className={className}>
                {props.link == ""?(
                    <img src={props.image} className="d-block car_image" alt="..."></img>
                ):(
                    <a href={props.link}><img src={props.image} className="d-block car_image" alt="..."></img></a>
                )}   
            </div>
        )
    }

    const Indicator = (props)=>{
        const slide = `Slide${props.slide+1}`

        return(
            <div>
            {props.i == 0?(
                <button type="button" data-bs-target="#advertismentCaourusel" data-bs-slide-to={props.slide} className="active" aria-current="true" aria-label={slide}></button>
            ):(
                <button type="button" data-bs-target="#advertismentCaourusel" data-bs-slide-to={props.slide} aria-label={slide}></button>
            )}
            </div>
        )
    }


    return(
        <div className="container-fluid">
        <div id="ads" className="row justify-content-center">
            <div className="col-12 col-md-8">

                <div id="advertismentCaourusel" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-indicators mb-4">
                        {adObjects.map((object, I)=>(
                            <Indicator key={I} slide={I} i={I}/>
                        ))}
                    </div>

                    <div className="carousel-inner container-fluid pt-2 sds">
                        <div className="row">
                            <div className="col-12">

                                {adObjects.map((object, I) =>(
                                    <Ad key={I} image={object.imageLink} link={object.link} i={I}/>
                                ))}
                                
                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#advertismentCaourusel"  data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#advertismentCaourusel"  data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>

                </div>
            </div>
        </div>
        </div>
    )
}

export default AdvertisementBoard;