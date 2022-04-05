import './css/Examples.scss';
import { useEffect, useState } from 'react';
import SiteButton from './SiteButton.jsx';
import example_img from '../images/example.jpg'
import { getTokenData } from '../utils/interact';
import { useSelector } from 'react-redux';

const config = require('../config.json')

const BetsAbout = ()=>{
    const bets_about = `You can bet on any token and win ${config.currency} if you mint it. Bet price is ${config.betPrice}  ${config.currency}. ` + 
    "As soon as you minted token you bet on, you will recieve 85% of total bets!"
    
    return(
        <div className="modal fade" id="bets_about" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bets_about_modal">

                    <div className="bets_about_content">
                        {bets_about}
                    </div>

                    <button className="site_btn mt-5" data-bs-dismiss="modal">Got it!</button>
                </div>
            </div>
        </div>
    )
}

const Example = () =>{
    // const class_name = "col col-md-4 col-6 example";
    
    const wallet = useSelector(state => state.interactReducer.wallet)
    const [textBet, setTextBet] = useState("Connect wallet to bet")

    useEffect(async ()=>{
        if(wallet != ''){
            setTextBet("Bet on this token")
        }else{
            setTextBet("Connect wallet to bet")
        }
    }, [])

    const [loadingInfo, setLoadingInfo] = useState('Loading token data...');
    const [tokenIdToBet, setTokenIdToBet] = useState(0);

    async function getToken(){
        if(isNaN(document.getElementById('token_input').value) || document.getElementById('token_input').value == "" || Number(document.getElementById('token_input').value)<1){
            setLoadingInfo("Enter number between 1 and 4000");
            document.getElementById("loading_info").style.justifyContent = "center";
            document.getElementById("loading_info").style.display = "flex";
            return;
        }
        setLoadingInfo("Loading token data...");
        setTokenIdToBet(document.getElementById('token_input').value);
        document.getElementById("loading_info").style.display = "flex";
        document.getElementById("loading_info").style.justifyContent = "center";

        const {tokenMetadata, 
            tokenImage, 
            tokenOwner,
            tokenMintedBy} = await getTokenData(document.getElementById('token_input').value);
        
        document.getElementById("token_image").src = tokenImage;

        document.getElementById("token_number").innerHTML = `COLLECTION NAME #${document.getElementById('token_input').value}`

        if(tokenOwner == undefined){
            document.getElementById("token_owner").innerHTML = `Owner: not owner yet`;
            document.getElementById("minted_by").innerHTML = `Minted by: not minted yet`
        }else{
            document.getElementById("token_owner").innerHTML = `Owner: ${tokenOwner}`;
            document.getElementById("minted_by").innerHTML = `Minted by: ${tokenMintedBy}`;
        }

       

        document.getElementById("token_info").style.display = "flex";

        document.getElementById("loading_info").style.display = "none";
    }

    return(
        <div className="row">
            <div className="container-fluid">
                <div className="row justify-content-center token_input_row">
                    <div className="col-12">
                        <div className="container">

                            <div className="row justify-content-center">
                                <input type="text" className="col-12" id="token_input" placeholder='Enter token ID'/>
                            </div>

                            <div className='row justify-content-center'>
                                <SiteButton func={()=>getToken()} text="Search token" id="search_btn" cn="col-lg-2 col-sm-4 col-4"></SiteButton>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <span className="col-12 mt-5" id="loading_info">{loadingInfo}</span>
                </div>
            </div>
           
            <div className="container-fluid">
                <div className="row justify-content-center" id="token_info">

                    <div className="col-lg-4 col-12 token_image_holder">
                        <img id="token_image" src={example_img}></img>
                    </div>

                    <div className="col-lg-8 col-12 token_traits_holder">
                        <div className="container-fluid">
                            <div className="row">
                                <h3 id="token_number">Collection name #NUMBER</h3>
                                <h5 className="trait_item">Total bets: </h5>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item" id="token_owner">Owner: </span>
                                <span className="trait_item" id="minted_by">Minted by: </span>
                                
                                <div className="row justify-content-end">
                                    <div className="col-12 col-md-3 row">
                                    <SiteButton 
                                    text={textBet}
                                    cn="col-12 bet_btn"
                                    ></SiteButton>

                                    <a data-bs-toggle="modal" data-bs-target="#bets_about" className="col-12 bets_more">more about bets</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <BetsAbout></BetsAbout>
        </div>
    )
}

export default Example;