import './AdvertismentForm.scss';
import SiteButton from './components/SiteButton';
import { useEffect, useState } from 'react';

import { 
    connectWallet, 
    getCurrentWalletConnected
} from './utils/interact';

const AdvertismentForm = ()=>{

    const [wallet, setWallet] = useState();
    const [status, setStatus] = useState();

    useEffect(async()=>{
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address);
        setStatus(status);

        addWalletListener();
    }, [])

    function addWalletListener() {
        if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
            setWallet(accounts[0]);
            } else {
            setWallet("");
            }
        });
        } else {

        }
    }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    //плюс/минус на кнопке доп функций
    const [plus, setPlus] = useState("+");

    function add_rem(){
        if(plus == "+"){
            setPlus("-");
            setPerc(0.1);
        }else{
            setPlus("+");
            setPerc(0);
        }
    }

    //картинка проекта
    const [file, setFile] = useState(undefined);
    const [imgUrl, setImgUrl] = useState(undefined);

    function loadImg(e){
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () =>{
            setFile(file);
            setImgUrl(reader.result);
        }

        reader.readAsDataURL(file);   
    }

    const ImagePreview = () =>{
        return(
            file == undefined?(
                <div id="load_image_empty">
                    Load image
                </div>
            ):(
                <img src={imgUrl} className="img-fluid" id="image_prev"></img>
            )
        )
    }
    
    //продолжительность показа рекламы
    const [durationCount, setDurationCount] = useState(1);
    const [durationType, setDurationType] = useState('hours');
    const durationTypeMap = new Map(([
        ['hours', 1],
        ['12 hours', 10],
        ['days', 15],
        ['weeks', 80],
        ['months', 250]
    ]));


    //выбор типа продолжительности
    function calcAdsType(){
        var type = document.getElementById('duration_form').value;
        setDurationType(type);
        
    }
    //выбор количества продолжительности
    function calcDurationCount(action){
        if(action == '+'){
            setDurationCount(durationCount+1);
        }else{
            if(durationCount != 1)
            setDurationCount(durationCount-1);
        }
    }
    //процент добавления к цене при доп опциях
    const [perc, setPerc] = useState(0);


    const image_load_field = document.getElementById("image_load_label");

    const description_input_field = document.getElementById("description_area");

    const link_to_website_input_field = document.getElementById("link_to_website_input");

    function writetocon(){
        if(description_input_field.value == ""){
            description_input_field.classList.add("empty_field_nonrequired");
        }

        if(plus == "-" && link_to_website_input_field.value == ""){
            link_to_website_input_field.classList.add("empty_field_required");
        }

        if(document.getElementById("image_load").value == ""){
            image_load_field.classList.add("empty_field_required");
        }
    }

    function clearFields(){
        description_input_field.value = "";
        link_to_website_input_field.value= "";

        setFile(undefined);
    }


    const AdsAbout = ()=>{
        return(
            <div className="row justify-content-center">
                <div className="col-12 ads_about_holder mt-5">
                    <span>You can order an ads for you project</span><br/>
                    <span>It will be placed on a carousel on main page</span><br/>
                    <span>Just put banner image of your project, put the link if you want and select the duration that you need</span><br/>
                    <span>It will be queued and placed when the place is free</span><br/>
                    <span>Duration will be counted from the moment of placement</span>
                </div>
            </div>
        )
    }

    return(
        <div className="container">

            <div class="row btn_holder">
                <a href="/" className="col-sm-6" id="back_to_minter_btn">Back to minter page</a>
            </div>

            <AdsAbout></AdsAbout>

            {wallet != ""?(
                <div className='row justify-content-center wallet_holder'>
                    <span className="col-7">Wallet connected: {wallet}</span>
                </div>
            ):(
                <div className='row justify-content-center'>                 
                    <SiteButton
                    func={()=>connectWalletPressed()}
                    text="Connect wallet"
                    cn="col-4 mt-5 mb-3 connect_btn"
                    >    
                    </SiteButton>
                </div>
            )}
            

            <div className="row">
                <div className="container col-md-7" id="form_holder">
                    
                    <div className="row" id="image_input_holder">
                        <div className="col-12 col-md-4">
                            <h4 id="input_image_txt">Input image of Your product:</h4>
                        </div>
                        <div className="col-12 col-md-8 row">
                            <ImagePreview></ImagePreview>
                            <label id="image_load_label" for="image_load">Browse...</label>
                            <input 
                            accept='.jpg,.jpeg,.png' 
                            onChange={(e)=>loadImg(e)} 
                            id="image_load" 
                            type="file"
                            onClick={()=>image_load_field.classList.remove("empty_field_required")}
                            ></input>
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
                                onClick={()=>description_input_field.classList.remove("empty_field_nonrequired")}
                                ></textarea>
                                </p>
                            </div>

                            <div className="col-md-4 duration_holder holder">
                                <p>Choose show duration</p>

                                <select 
                                class="form-select" 
                                aria-label="Default select example"
                                id="duration_form"
                                onChange={calcAdsType}
                                >
                                    <option class="dur_item" value="hours" selected>Hours</option>
                                    <option class="dur_item" value="12 hours">12 hours</option>
                                    <option class="dur_item" value="days">Days</option>
                                    <option class="dur_item" value="weeks">Weeks</option>
                                    <option class="dur_item" value="months">Months</option>
                                </select>

                                <div className="row amount_btns">
                                    <SiteButton func={()=>calcDurationCount('-')} cn="amount_btn col-4 dur_btn" tn="btn_text_amount" text="-"></SiteButton>
                                    <h4 className="col-4">{durationCount}</h4>
                                    <SiteButton func={()=>calcDurationCount('+')} cn="amount_btn col-4 dur_btn" tn="btn_text_amount" text="+"></SiteButton>
                                </div>
                            </div>

                            <div className="col-md-4 btns_holder holder">
                                <div classname="row form_btns">
                                    <SiteButton func={()=>clearFields()} cn="col-md-12 form_btn" tn="form_btn_text" id="reset_btn" text="Reset"></SiteButton>
                                    <SiteButton func={()=>writetocon()} cn="col-md-12 form_btn" tn="form_btn_text" id="submit_btn" text="Submit"></SiteButton>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-12 col-lg-7 form_footer" id="price_text">
                                <h5>Your price now is {(durationTypeMap.get(durationType) * durationCount) 
                                    +
                                    (durationTypeMap.get(durationType) * durationCount * perc)} MATIC</h5>
                            </div>

                            <div className="col-12 col-lg-5 form_footer" id="add_btn_box">
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
                            placeholder='Link to the website'
                            onClick={()=> link_to_website_input_field.classList.remove("empty_field_required")}
                            ></input>
                    </div>
                    
                    </div>

                    
                
                </div>

            </div>

        </div>
    )
}

export default AdvertismentForm;