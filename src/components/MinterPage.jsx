import MintWindow from './MintWindow';
import AdvertisementBoard from './AdvertisementBoard';
import Examples from './Examples';

import './css/MinterPage.scss';
import SiteButton, { PageButton } from './SiteButton.jsx';

import { useEffect, useState } from 'react';

import {
  connectWallet,
  getCurrentWalletConnected,
  isWalletWhiteListed,
  bet
} from '../utils/interact';
import { useDispatch, useSelector } from 'react-redux';
import { set_wallet_action } from '../store/walletInteractReducer';

function MinterPage() {


  const wallet = useSelector(state => state.walletInteractReducer.wallet)
  const [status, setStatus] = useState();
  const [walletWhiteListed, setWalletWhiteListed] = useState(false);

  const dispatch = useDispatch()

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setStatus(status);

    dispatch(set_wallet_action(address))

    if (address != '') {
      const { whiteListed } = await isWalletWhiteListed(address);
      setWalletWhiteListed(whiteListed);
    }

    addWalletListener();
  }, [])

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          dispatch(set_wallet_action(accounts[0]))
        } else {
          dispatch(set_wallet_action(''))
        }
      });
    } else {
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();

    dispatch(set_wallet_action(walletResponse.address))

    setStatus(walletResponse.status);
  };

  const [mintAmount, setMintAmount] = useState(1);
  const maxMintAmount = 5;


  function changeMintAmount(sign) {
    setStatus("");
    if (sign == "-") {
      if (mintAmount > 1) {
        setMintAmount(mintAmount - 1)
      } else {
        setStatus("You cannot mint less than 1 NFT")
      }
    } else if (sign == "+") {
      if (mintAmount < maxMintAmount) {
        setMintAmount(mintAmount + 1)
      } else {
        setStatus("You cannot mint more than 5 NFTs")
      }
    }
  }


  return (
    <div className="container-fluid">

      <AdvertisementBoard></AdvertisementBoard>

      <div className="row justify-content-center mt-3">
        <div className="col-6 mt-2" id="read_about_ads_link_holder">
          <a id="read_about_ads_link" href="#ads_order">read more about ads</a>
        </div>
      </div>

      <div className="minter row">

        <MintWindow
          onConnect={() => connectWalletPressed()}
          walletConnected={wallet != ""}
          cn=" col col-md-7"
          status={status}
          mintAmount={mintAmount}
          incMintAmount={() => changeMintAmount("+")}
          decMintAmount={() => changeMintAmount("-")}
          whiteListed={walletWhiteListed}
          totalCost={mintAmount * 50}
        >
        </MintWindow>

      </div>

      <h3 id="examples_txt">FIND TOKEN BY ID</h3>

      <Examples walletConnected={wallet != ""} />

      <h3 id="orders_txt">OFFERS FOR YOU</h3>
      <hr className="line" />

      <div className="row welcomes">

        <div className="col col-sm welcome_page" id="ads_order">

          <h2>YOU CAN ORDER AN ADS</h2>
          <br />
          <h3>1 month, 1 week or even 1 hour as much as you want</h3>
          <br />
          <PageButton page="/adsorder" cn="order_btn fillable" text="READ MORE"></PageButton>

        </div>


        <div className="col col-sm welcome_page" id="rebus_welc">

          <h2>TRY TO GET SYM CHEEPER</h2>
          <br />
          <h3 >Just solve one of proposed rebuses and get one SYM</h3>
          <br />
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
