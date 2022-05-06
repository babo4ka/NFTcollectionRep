import MintersLinks from '../MintersLinks'
import './PandumbsMinterPage.scss'
import { useEffect, useState } from 'react'
import example_img from './rebus_img_4.png'
import { connectWallet, getCurrentWalletConnected } from '../../utils/interact.js'
import { useDispatch, useSelector } from 'react-redux'
import { set_status_action, set_wallet_action } from '../../store/interactReducer.js'
import $ from 'jquery'
const config = require('../../../config.json')

const PandumbsMinterPage = () => {


    const [status, setStatus] = useState('')
    const wallet = useSelector(state => state.interact.wallet)

    const dispatch = useDispatch()

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected()
        setStatus(status)
        dispatch(set_status_action(status))
        dispatch(set_wallet_action(address))

        $(window).ready(() => {
            console.log("sas")
            $('body').css('background-color', '#0B0B0C')
        })

        addWalletListener()
    }, [])

    async function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", async (accounts) => {
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
        const walletResponse = await connectWallet()

        dispatch(set_wallet_action(walletResponse.address))

        dispatch(set_status_action(walletResponse.status))
    }

    const minimalPrice = config.pandumbs.price
    const [price, setPrice] = useState(minimalPrice)

    const choosePrice = () => {
        setPrice($('#p_price_choose').val() > minimalPrice ? $('#p_price_choose').val() : minimalPrice)
    }

    const maxMintAmount = 5
    const [mintAmount, setMintAmount] = useState(1)
    const decAmount = () => {
        setMintAmount(prev => {
            if (prev == 1) return prev
            return prev - 1
        })
    }
    const incAmount = () => {
        setMintAmount(prev => {
            if (prev == maxMintAmount) return prev
            return prev + 1
        })
    }

    return (
        <div className="container-fluid mb-5">

            <div className="row justify-content-center">
                <div className="links col-12">
                    <MintersLinks active_link='pndmb' active_class={'p_active'} />
                </div>

                <div className="wallet_info row justify-content-center text-center mt-5">
                    {wallet == "" ? (
                        <button onClick={connectWalletPressed} className="col-4 site_btn p_site_btn">Connect wallet</button>
                    ) : (
                        <span><h6>wallet connected: {wallet}</h6></span>
                    )}
                </div>

                <div className="minter_area col-12 row">
                    <div className="examples col-12 col-md-6 row text-center justify-content-center">
                        <div className="p_examples_image_holder">
                            <img className="p_examples_image" src={example_img} />
                        </div>
                        <span className="mt-3">These are examples of 20 random tokens</span>
                    </div>

                    <div className="mint_nav col-12 col-md-6 row text-center justify-content-center">
                        <span className="col-12">Hello, here you can mint some {config.pandumbs.collection_sym}</span>
                        <span className="col-12">Current price is {config.pandumbs.price} {config.currency}</span>
                        <span className="col-12">0/0 already minted</span>

                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className="col-4 site_btn p_site_btn">Connect wallet</button>
                        ) : (
                            <div>
                                <div className="counter">
                                    <button onClick={decAmount} className="counter_item p_count_btn">-</button>
                                    <span className="counter_item">{mintAmount}</span>
                                    <button onClick={incAmount} className="counter_item p_count_btn">+</button>
                                </div>
                                <button className="col-4 site_btn p_site_btn mt-2">MINT NOW</button>
                            </div>
                        )}

                        <span className="mt-2">or you can mint for any price you want (higher than {config.pandumbs.price})</span>

                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className="col-4 site_btn p_site_btn">Connect wallet</button>
                        ) : (
                            <div>
                                <div className="higher_price_area row justify-content-center mt-2">
                                    <input onChange={choosePrice} id="p_price_choose" className="col-4 price_enter higher_area_item" min={config.pandumbs.price} placeholder="Enter your price" type="number" />
                                    <button id="p_montfor_btn" className="col-4 site_btn p_site_btn higher_area_item">MINT FOR {price}</button>
                                </div>
                            </div>
                        )}

                        <span className="mt-2">you also can bet on any token</span>

                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className="col-4 site_btn p_site_btn">Connect wallet</button>
                        ) : (
                            <div>
                                <div className="bet_area row justify-content-center mt-2">
                                    <input className="col-4 price_enter higher_area_item" placeholder="Enter tokenId" type="number" />
                                    <button className="col-4 site_btn p_site_btn higher_area_item">BET ON</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <span className="status_area col-12 text-center mt-3">
                    {status == '' ? ("") :
                        (
                            <h4>{status}</h4>
                        )}
                </span>
            </div>

        </div>
    )
}

export default PandumbsMinterPage
