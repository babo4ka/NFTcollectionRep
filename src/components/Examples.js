import './css/Examples.scss';
import { useEffect, useState } from 'react';
import SiteButton from './SiteButton';
import example_img from '../images/example.jpg'

import { getTokenData } from '../utils/interact';

const BetsAbout = ()=>{
    const rebus_about = "You can bet on any token and win MATIC if you mint it. Bet price is 0.25  MATIC. " + 
    "As soon as you minted token you bet on, you will recieve 85% of total bets!"
    
    return(
        <div class="modal fade" id="bets_about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bets_about_modal">

                    <div className="bets_about_content">
                        {rebus_about}
                    </div>

                    <button class="site_btn mt-5" data-bs-dismiss="modal">Got it!</button>
                </div>
            </div>
        </div>
    )
}

const Example = (props) =>{
    // const class_name = "col col-md-4 col-6 example";
    
    useEffect(async ()=>{
        if(props.walletConnected){
            setTextBet("Bet on this token")
        }else{
            setTextBet("Connect wallet to bet")
        }
    }, [])

    const [loadingInfo, setLoadingInfo] = useState('Loading token data...');

    async function getToken(){
        if(document.getElementById('token_input').value == "" || Number(document.getElementById('token_input').value)<0){
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

    const [tokenIdToBet, setTokenIdToBet] = useState(0);



    const [textBet, setTextBet] = useState("Connect wallet to bet")

    return(
        <div className="row">
            <div className="container-fluid">
                <div className="row justify-content-center token_input_row">
                    <div className="col-12">
                        <div className="container">

                            <div classname="row">
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