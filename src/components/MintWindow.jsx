import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './css/MintWindow.scss'
import SiteButton from './SiteButton.jsx';
import { getTokenCountData } from '../utils/interact';
import { set_maxSupply_action, set_minted_action, set_status_action } from '../store/interactReducer';

const config = require('../config.json')

const MintWindow = (props) => {
    const objClassName = "container mint_window " + props.cn;

    const wallet = useSelector(state => state.interactReducer.wallet)
    const status = useSelector(state => state.interactReducer.status)
    const whiteListed = useSelector(state => state.interactReducer.whiteListed)

    const collection_data = useSelector(state => state.interactReducer)
    const totalSupply = collection_data.minted
    const maxSupply = collection_data.maxSupply

    const dispatch = useDispatch()

    const [mintAmount, setMintAmount] = useState(1);
    const [totalCost, setTotalCost] = useState(50)
    const maxMintAmount = 5;

    const changeMintAmount = sign => {
        dispatch(set_status_action(''))
        if (sign == "-") {
            if (mintAmount > 1) {
                setMintAmount(prev => prev - 1)
                setTotalCost(prev => prev - 50)
            } else {
                dispatch(set_status_action("You cannot mint less than 1 NFT"))
            }
        } else if (sign == "+") {
            if (mintAmount < maxMintAmount) {
                setMintAmount(prev => prev + 1)
                setTotalCost(prev => prev + 50)
            } else {
                dispatch(set_status_action("You cannot mint more than 5 NFTs"))
            }
        }
    }

    useEffect(async () => {
        const { totalSupply, maxSupply } = await getTokenCountData();

        dispatch(set_minted_action(totalSupply))
        dispatch(set_maxSupply_action(maxSupply))
    }, [])

    return (
        <div className={objClassName}>

            <h3 id="collection_name" className="minter_item">{config.collection_name}</h3>

            <a href="#examples_txt" id="link_to_examples" className="minter_item">look on examples</a>

            <div id="current_tokens_count" className="minter_item">
                {totalSupply} / {maxSupply} are minted
            </div>


            {whiteListed == true ? (
                <div className="container">
                    <div className="row justify-content-center">
                        <span className="col-12">Congratz, You're whitelisted and can mint NFT for free!</span>
                        <SiteButton id="mint_btn" cn="mint_btn fillable col-4 mt-4" text="GET NFT"></SiteButton>
                    </div>
                </div>
            ) :
                (
                    <div>
                        <div id="token_cost" className="minter_item">
                            1 SYM costs 50 MATIC
                        </div>

                        {wallet != '' ? (
                            <div>
                                <div className="row minter_item" id="amount_chooser">
                                    <SiteButton func={() => changeMintAmount('-')} cn="amount_btn col-sm-auto" tn="btn_text_amount" text="-"></SiteButton>
                                    <h4 className="col-sm-auto">{mintAmount}</h4>
                                    <SiteButton func={() => changeMintAmount('+')} cn="amount_btn col-sm-auto" tn="btn_text_amount" text="+"></SiteButton>
                                </div>


                                <div id="total_cost" className="minter_item">
                                    Total cost {totalCost} MATIC
                                </div>

                                <SiteButton id="mint_btn" cn="mint_btn fillable" text="GET NFT"></SiteButton>
                            </div>
                        ) : (
                            <div>
                                <SiteButton func={() => props.onConnect()} text="Connect wallet"></SiteButton>
                            </div>
                        )}
                    </div>
                )}



            <div id="info_line" className="minter_item">
                {status}
            </div>
        </div>
    )
}

export default MintWindow;