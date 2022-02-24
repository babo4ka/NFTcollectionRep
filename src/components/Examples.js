import './css/Examples.scss';
import { useEffect } from 'react';
import SiteButton from './SiteButton';

const Example = (props) =>{
    const imageURL = "https://99px.ru/sstorage/86/2016/06/image_860106162325305091788.gif";
    // const class_name = "col col-md-4 col-6 example";
    
    function write(){
        console.log(document.getElementById('token_input').value)

        document.getElementById("token_info").style.display = "flex";
    }

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
                                <SiteButton func={()=>write()} text="Search token" id="search_btn" cn="col-lg-2 col-sm-4 col-4"></SiteButton>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center" id="token_info">

                    <div className="col-lg-4 col-12 token_image_holder">
                        <img id="token_image" src={imageURL}></img>
                    </div>

                    <div className="col-lg-8 col-12 token_traits_holder">
                        <div className="container-fluid">
                            <div className="row">
                                <h4>Collection name #NUMBER</h4>
                                <span className="trait_item">Total bets: </span>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item">Trait name: </span>
                                <span className="trait_item">Owner: </span>
                                <span className="trait_item">Minted by: </span>
                                
                                <div className="row justify-content-end">
                                    <div className="col-12 col-md-3 row">
                                    <SiteButton 
                                    text="Bet on this token"
                                    cn="col-12 bet_btn"
                                    ></SiteButton>

                                    <a className="col-12 bets_more">More about bets</a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Example;