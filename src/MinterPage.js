import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Examples from './components/Examples';

import './MinterPage.scss';
import SiteButton, {PageButton} from './components/SiteButton';

import { useEffect, useState } from 'react';

import { 
  connectWallet, 
  getCurrentWalletConnected
  } from './utils/interact';

function MinterPage() { 

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

  const [mintAmount, setMintAmount] = useState(1);
  const maxMintAmount = 5;

  function changeMintAmount(sign){
    setStatus("");
    if(sign == "-"){
      if(mintAmount > 1){
        setMintAmount(mintAmount-1)
      }else{
        setStatus("You cannot mint less than 1 NFT")
      }
    }else if(sign == "+"){
      if(mintAmount < maxMintAmount){
        setMintAmount(mintAmount+1)
      }else{
        setStatus("You cannot mint more than 5 NFTs")
      }
    }
  }

  return (
    <div className="container-fluid">

      <AdvertisementBoard></AdvertisementBoard>

      <div className="minter row">
        
        <MintWindow 
        onConnect={()=>connectWalletPressed} 
        walletConnected={wallet != ""} 
        cn=" col col-md-7"
        status={status}
        mintAmount={mintAmount}
        incMintAmount={()=>changeMintAmount("+")}
        decMintAmount={()=>changeMintAmount("-")}
        >
        </MintWindow>

      </div>

      <h3 id="examples_txt">FIND TOKEN BY ID</h3>
      {/* <hr class="line"/> */}

      <Examples/>

      <h3 id="orders_txt">OFFERS FOR YOU</h3>
      <hr class="line"/>

      <div className="row welcomes">

        <div className="col col-sm welcome_page" id="ads_order">

            <h2>YOU CAN ORDER AN ADS</h2>
            <br/>
            <h3>1 month, 1 week or even 1 hour as much as you want</h3>
            <br/>
            <PageButton page="/adsorder" cn="order_btn fillable" text="READ MORE"></PageButton>

        </div>


        <div className="col col-sm welcome_page" id="rebus_welc">

            <h2>TRY TO GET SYM CHEEPER</h2>
            <br/>
            <h3 >Just solve one of proposed rebuses and get one SYM</h3>
            <br/>
            <PageButton page="/rebuses" cn="order_btn fillable" text="Let's try!"></PageButton>

        </div>
      </div>

      <div className="row">
        <span className="col about">тут короче будет описание, может какое-то предупреждение и тд и все такое бла бла бла бла бл абла бл</span>
      </div>
      </div>
  );
}

export default MinterPage;
