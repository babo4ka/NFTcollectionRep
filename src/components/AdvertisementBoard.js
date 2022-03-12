import './css/AdvertisementBoard.scss'

import { AdObjects } from './AdObjects';

const AdvertisementBoard = ()=>{

    const adObjects = AdObjects().objects;

    const Ad = (props)=>{
        const className = props.i==0?"carousel-item mb-3 active":"carousel-item mb-3"
        return(
            <div class={className}>
                {props.link == ""?(
                    <img src={props.image} class="d-block car_image" alt="..."></img>
                ):(
                    <a href={props.link}><img src={props.image} class="d-block car_image" alt="..."></img></a>
                )}   
            </div>
        )
    }

    const Indicator = (props)=>{
        const slide = `Slide${props.slide+1}`

        return(
            <div>
            {props.i == 0?(
                <button type="button" data-bs-target="#advertismentCaourusel" data-bs-slide-to={props.slide} class="active" aria-current="true" aria-label={slide}></button>
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

                <div id="advertismentCaourusel" class="carousel slide" data-bs-ride="carousel">

                    <div class="carousel-indicators mb-4">
                        {adObjects.map((object, I)=>(
                            <Indicator slide={I} i={I}/>
                        ))}
                    </div>

                    <div class="carousel-inner container-fluid pt-2 sds">
                        <div className="row">
                            <div className="col-12">

                                {adObjects.map((object, I) =>(
                                    <Ad image={object.imageLink} link={object.link} i={I}/>
                                ))}
                                
                            </div>
                        </div>
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#advertismentCaourusel"  data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>

                    <button class="carousel-control-next" type="button" data-bs-target="#advertismentCaourusel"  data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>

                </div>
            </div>
        </div>
        </div>
    )
}

export default AdvertisementBoard;