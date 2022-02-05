import './AdvertismentForm.scss';
import SiteButton from './components/SiteButton';
import { useState } from 'react';

const AdvertismentForm = ()=>{

    
    const [plus, setPlus] = useState("+");
    function add_rem(){
        if(plus == "+"){
            setPlus("-");
        }else{
            setPlus("+");
        }
    }
    
    return(
        <div className="container">

            <div class="row btn_holder">
                <a href="/" className="col-sm-6" id="back_to_minter_btn">Back to minter page</a>
            </div>

            <div className="row">

                <div className="container col-md-7" id="form_holder">
                    
                    <div className="row">
                        <div className="col-4">
                            <h3>Input image of Your product:</h3>
                        </div>
                        <div className="col-8 row">
                            <image src="#" id="image_prev"></image>
                            <input  id="image_load" type="file"></input>
                        </div>
                    </div>

                    <hr id="line"></hr>

                    <div className="container">
                        <div className="row">

                            <div className="col-md-4 description_holder holder">
                                <p>You can put some description</p>
                                <p>
                                <textarea
                                maxLength={150} 
                                placeholder='Put your description(150 symbols max)'
                                id="description_area"
                                ></textarea>
                                </p>
                            </div>

                            <div className="col-md-4 duration_holder holder">
                                <p>Choose show duration</p>

                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Hours</option>
                                    <option value="1">12 hours</option>
                                    <option value="2">Days</option>
                                    <option value="3">Weeks</option>
                                    <option value="4">Months</option>
                                </select>

                                <div className="row amount_btns">
                                    <SiteButton cn="amount_btn col-4 dur_btn" tn="btn_text_amount" text="-"></SiteButton>
                                    <h4 className="col-4">0</h4>
                                    <SiteButton cn="amount_btn col-4 dur_btn" tn="btn_text_amount" text="+"></SiteButton>
                                </div>
                            </div>

                            <div className="col-md-4 btns_holder holder">
                                <div classname="row form_btns">
                                    <SiteButton cn="col-md-12 form_btn" tn="form_btn_text" id="reset_btn" text="Reset"></SiteButton>
                                    <SiteButton cn="col-md-12 form_btn" tn="form_btn_text" id="submit_btn" text="Submit"></SiteButton>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-12 col-lg-7 form_footer" id="price_text">
                                <h5>Your price now is cost*time MATIC</h5>
                            </div>

                            <div className="col-12 col-lg-5 form_footer" id="add_btn_box">
                                {/* <SiteButton id="add_btn" cn="" tn="add_btn_txt" text="Additional options"></SiteButton> */}
                                <button 
                                onClick={()=>add_rem()}
                                className="container" 
                                data-bs-toggle="collapse"
                                data-bs-target="#link_add_form" 
                                id="add_btn_block"
                                >
                                    <div className="row">
                                        <div className="col-9 col-md-7 col-lg-9 text-truncate" id="add_txt">Additional options</div>
                                        <div className="col-3 col-md-5 col-lg-3" id="add_icon">{plus}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                    
                    <div className="row link_add_form_box">
                        <div className="collapse col-md-12" id="link_add_form">
                            <div className="link_add_form_item">Place link to Your project below(+10% to the price)</div>
                            
                            <input 
                            id="link_to_website_input" 
                            className="link_add_form_item" 
                            type="text" 
                            placeholder='Link to the website'></input>
                    </div>
                    
                    </div>

                    
                
                </div>

            </div>

        </div>
    )
}

export default AdvertismentForm;