import SiteButton, { OpenRebusButton } from "./components/SiteButton";
import './RebusesPage.scss';
import RebusWindow from "./components/RebusWindow";
import React, { useEffect, useState } from 'react';


import { 
    connectWallet, 
    getCurrentWalletConnected,
    getRebusData,
    startRebus
} from './utils/interact';
import { AllRebuses } from "./AllRebuses";



const Rebus = (props) =>{

    const id = `#rebusWindow${props.number}`


    return(
        <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 rebus_body">
            <div className="card-body card_body">
                <h1 className="rebus_number">#{props.number}</h1>
                <p className="card-text rebus_desc">Try to solve this rebus for 2 MATIC and get one SYM</p>
                <p className="rebus_desc">Total tries: {props.tries}</p>
                {props.walletConnected == true?(
                <OpenRebusButton 
                data_bs_toggle="modal" 
                data_bs_target={id}
                data_bs_whatever={props.number}
                cn="fillable" 
                text="open rebus"></OpenRebusButton>
                
                ):(
                    <SiteButton
                    func={()=>props.func()}
                    text="Connect wallet"
                    >
                    </SiteButton>
                )}

                {props.beingSolved?(
                  <div>
                      <span id="solving">Maybe this rebus is being solved by smn.!</span>
                  </div>
                ):(
                  <div>
                      <span>Rebus is free! Go ahead :)</span>
                  </div>
                )}

            </div>
        </div>
    )
}

const RebusesPage = (props)=>{

  

    const [wallet, setWallet] = useState();
    const [status, setStatus] = useState();

    const [allRebusData, setAllRebusData] = useState();
  
    useEffect(async()=>{
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
        
      const {rebusData} = await getRebusData();
      setAllRebusData(rebusData);
      
      setWindows( AllRebuses().rebusData.map((item, itemI)=>
      <RebusWindow  rebusData={item} number={itemI+1}/>));

      setOpens(AllRebuses().rebusData.map((item, itemI)=>(
        <Rebus 
        beingSolved={rebusData[itemI].beingSolved}
        tries={rebusData[itemI].tries} 
        func={()=>connectWalletPressed()} walletConnected={address!=""} number={itemI+1}/>)));

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

  const RebusesAbout = ()=>{
      return (
          <div>
            <div className="row justify-content-center text_holder">
                <div className="col-12">
                    <span>Hello! Feel free to try solving any of these rebuses</span><br/>
                    <span>They are quite simple</span><br/>
                    <span>There will be some cards. You will have some time to put them in right order</span><br/>
                    <span>Just pay 2 MATIC to open the rebus and go ahead!</span><br/>
                    <span>If you will solve the rebus, you'll get one SYM and 50% of money other guys spent on tries</span><br/>
                    <span>Once you get solve this rebus, you will be whitelisted and will be able to mint free token</span>
                </div>
            </div>
          </div>
      )
  }


    const [windows, setWindows] = useState();
    const [opens, setOpens] = useState();

    
  return(
        <div className="container">
            <div class="row btn_holder">
                <a href="/" className="col-sm-6" id="back_to_minter_btn">Back to minter page</a>
            </div>
        
            <RebusesAbout></RebusesAbout>

            <div className="row info_holder justify-content-center mt-5">
                <span id="info_label" className="col-6">{status}</span>
            </div>
    
            <div className="container cards_holder">
                <div className="row cards_row">
                    {opens}
                </div>
            </div>
            {windows}
        </div>
    )
}

export default RebusesPage;