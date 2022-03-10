import './css/AdvertisementBoard.scss'
import image from '../images/bckgrnd.png'
import car1 from '../images/car1.jpg'
import car2 from '../images/car2.jpg'

const AdvertisementBoard = ()=>{
    return(
        <div className="container-fluid">
        <div id="ads" className="row justify-content-center">
            <div className="col-12 col-md-8">

                <div id="advertismentCaourusel" class="carousel slide" data-bs-ride="carousel">

                    <div class="carousel-indicators mb-4">
                        <button type="button" data-bs-target="#advertismentCaourusel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#advertismentCaourusel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#advertismentCaourusel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner container-fluid pt-2 sds">
                        <div className="row">
                            <div className="col-12">
                                <div class="carousel-item mb-3 active">
                                    <p>
                                        <a href="https://google.com"><img src={image} class="d-block car_image" alt="..."/> </a>
                                    </p>
                                    
                                </div>

                                <div class="carousel-item mb-3">
                                    <img src={car1} class="d-block car_image" alt="..."/>
                                </div>

                                <div class="carousel-item mb-3">
                                    <img src={car2} class="d-block car_image" alt="..."/>
                                </div>
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