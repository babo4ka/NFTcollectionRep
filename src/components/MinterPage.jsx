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
import { set_status_action, set_wallet_action, set_whitelisted_action } from '../store/interactReducer'


const config = require('../config.json')

function MinterPage() {

  const dispatch = useDispatch()

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    dispatch(set_status_action(status))
    dispatch(set_wallet_action(address))

    if (address != '') {
      const { whiteListed } = await isWalletWhiteListed(address);
      dispatch(set_whitelisted_action(whiteListed))
    }

    addWalletListener();
  }, [])

  async function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          dispatch(set_wallet_action(accounts[0]))
          const { whiteListed } = await isWalletWhiteListed(accounts[0]);
          dispatch(set_whitelisted_action(whiteListed))
        } else {
          dispatch(set_wallet_action(''))
          dispatch(set_whitelisted_action(false))
        }
      });
    } else {
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();

    dispatch(set_wallet_action(walletResponse.address))

    dispatch(set_status_action(walletResponse.status))
  };


  return (
    <div className="container-fluid">

      <AdvertisementBoard></AdvertisementBoard>

      <div className="row justify-content-center mt-3">
        <div className="col-6 mt-2" id="read_about_ads_link_holder">
          <a id="read_about_ads_link" href="#ads_order">read more about ads</a>
        </div>
      </div>

      <div className="minter row">

        <MintWindow onConnect={() => connectWalletPressed()} cn=" col col-md-7"></MintWindow>

      </div>

      <h3 id="examples_txt">FIND TOKEN BY ID</h3>

      <Examples/>

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

          <h2>TRY TO GET {config.collection_sym} CHEEPER</h2>
          <br />
          <h3 >Just solve one of proposed rebuses and get one {config.collection_sym}</h3>
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
