import SiteButton, { OpenRebusButton } from "./SiteButton";
import './css/RebusesPage.scss';
import RebusWindow from "./RebusWindow";
import React, { useEffect, useState } from 'react';
import {
  connectWallet,
  getRebusData,
  startRebus,
  isWalletWhiteListed
} from '../utils/interact';
import { AllRebuses } from "../utils/AllRebuses";
import { useDispatch, useSelector } from "react-redux";
import { set_status_action, set_wallet_action, set_whitelisted_action } from "../store/interactReducer";

const config = require('../config.json')

const Rebus = (props, {wallet}) => {

  const id = `#rebusWindow${props.number}`
  

  return (
    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 rebus_body">
      <div className="card-body card_body">
        <h1 className="rebus_number">#{props.number}</h1>
        <p className="card-text rebus_desc">Try to solve this rebus for {config.rebusPrice} {config.currency} and get one {config.collection_sym}</p>
        <p className="rebus_desc">Total tries: {props.tries}</p>
        {wallet != '' ? (
          <OpenRebusButton
            data_bs_toggle="modal"
            data_bs_target={id}
            data_bs_whatever={props.number}
            cn="fillable"
            text="open rebus"
          >
          </OpenRebusButton>
        ) : (
          <SiteButton
            func={() => props.func()}
            text="Connect wallet"
          >
          </SiteButton>
        )}

        {props.beingSolved ? (
          <div>
            <span id="solving">Maybe this rebus is being solved by smn.!</span>
          </div>
        ) : (
          <div>
            <span>Rebus is free! Go ahead :)</span>
          </div>
        )}

      </div>
    </div>
  )
}

const RebusesPage = () => {

  const dispatch = useDispatch()
  const wallet = useSelector(state => state.interactReducer.wallet)
  const status = useSelector(state => state.interactReducer.status)

  const [allRebusData, setAllRebusData] = useState();
  const [localRebusData, setLocalRebusData] = useState(AllRebuses().rebusData)

  useEffect(async () => {
    const { rebusData } = await getRebusData();
    setAllRebusData(rebusData);

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
    dispatch(set_status_action(walletResponse.status))
    dispatch(set_wallet_action(walletResponse.address))
  };

  const RebusesAbout = () => {
    return (
      <div>
        <div className="row justify-content-center text_holder">
          <div className="col-12">
            <span>Hello! Feel free to try solving any of these rebuses</span><br />
            <span>They are quite simple</span><br />
            <span>There will be some cards. You will have some time to put them in right order</span><br />
            <span>Just pay {config.rebusPrice} {config.currency} to open the rebus and go ahead!</span><br />
            <span>If you will solve the rebus, you'll get one {config.collection_sym} and 50% of money other guys spent on tries</span><br />
            <span>Once you get solve this rebus, you will be whitelisted and will be able to mint free token</span>
          </div>
        </div>
      </div>
    )
  }


  // const [windows, setWindows] = useState();
  // const [opens, setOpens] = useState();


  return (
    <div className="container">
      <div className="row btn_holder">
        <a href="/" className="col-sm-6" id="back_to_minter_btn">Back to minter page</a>
      </div>

      <RebusesAbout></RebusesAbout>

      <div className="row info_holder justify-content-center mt-5">
        <span id="info_label" className="col-6">{status}</span>
      </div>

      <div className="container cards_holder">
        <div className="row cards_row">
          {allRebusData != undefined?(
            localRebusData.map((item, itemI) => (
              <Rebus
                key={itemI}
                beingSolved={allRebusData[itemI].beingSolved}
                tries={allRebusData[itemI].tries}
                func={() => connectWalletPressed()} number={itemI + 1}
                wallet={wallet} />
            ))
          ):(
            'Loading rebuses...'
          )}
          
        </div>
      </div>
      {localRebusData.map((item, itemI) =>
      <RebusWindow key={itemI} rebusData={item} number={itemI + 1} />)}
    </div>
  )
}

export default RebusesPage;