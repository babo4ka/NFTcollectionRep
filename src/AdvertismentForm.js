import './AdvertismentForm.scss';

const AdvertismentForm = ()=>{

    
    return(
        <div className="container">

            <div className="row">

                <div className="container col-md-7" id="form_holder">
                    
                    <div className="row">
                        <div className="col-4">
                            <h3>Input image of Your product:</h3>
                        </div>
                        <div className="col-8 row">
                            <image src="#" id="image_prev"></image>
                            <input id="image_load" type="file"></input>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdvertismentForm;