import './GeeseMinterPage.scss'
import MintersLinks from '../MintersLinks'
import { useEffect, useState } from 'react'
import { connectWallet, getCurrentWalletConnected, bet, exists, mint, web3 } from '../../utils/interact.js'
import { useDispatch, useSelector } from 'react-redux'
import { set_status_action, set_wallet_action, set_g_minted_action, set_g_maxSupply_action } from '../../store/interactReducer.js'
import example_img from './g_examples.gif'
import $ from 'jquery'
const config = require('../../../config.json')

const address = "0x0e21873f05abae756ad2dcc51d3c5d127cd34506"
const abi = require('./g_contract_abi.json')

const GeeseMinterPage = () => {

    const status = useSelector(state => state.interact.status)
    const wallet = useSelector(state => state.interact.wallet)

    const minted = useSelector(state => state.interact.g_minted)
    const maxSupply = useSelector(state => state.interact.g_maxSupply)

    const dispatch = useDispatch()

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected()
        dispatch(set_status_action(status))
        dispatch(set_wallet_action(address))

        $(window).ready(() => {
            $('body').css('background-color', '#2f0c0f')
        })

        // await getTokenCountData()
        addWalletListener()
    }, [])

    const getTokenCountData = async () => {
        const contract = new web3.eth.Contract(abi, address);
        const maxSupply = await contract.methods.maxSupply().call();
        const totalSupply = await contract.methods.totalSupply().call();
      
        dispatch(set_g_minted_action(totalSupply))
        dispatch(set_g_maxSupply_action(maxSupply))
      
        return {
          maxSupply: maxSupply,
          totalSupply: totalSupply
        }
      }

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

    const minimalPrice = config.geese.price
    const [price, setPrice] = useState(minimalPrice)

    const choosePrice = () => {
        setPrice($('#u_price_choose').val() > minimalPrice ? $('#u_price_choose').val() : minimalPrice)
    }

    const maxMintAmount = config.geese.maxMintAmount
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

    const onBetPressed = async () => {
        let bet_id = Number($("#g_bet_enter").val())
        if (bet_id < 1 || bet_id > maxSupply) {
            dispatch(set_status_action(`Please, enter number between 1 and ${maxSupply}`))
            return
        }
        const result = await bet(bet_id, abi, address)
        dispatch(set_status_action(result.status))
    }

    const generateToken = async (tokens) => {
        let token = Math.floor(Math.random() * 11250) + 1
        let texists = await exists(token, abi, address)
        if (!texists && !tokens.includes(token)) {
            return token
        }
        return generateToken()
    }

    const onMinMintPressed = async () => {
        let tokens = []
        for (let i = 0; i < mintAmount; i++) {
            let token = await generateToken(tokens)
            tokens.push(token)
        }

        const result = await mint(tokens, abi, address)

        dispatch(set_status_action(result.status))
    }

    const onMoreMintPressed = async () => {
        let tokens = []
        for (let i = 0; i < mintAmount; i++) {
            let token = await generateToken(tokens)
            tokens.push(token)
        }

        const result = await mint(tokens, abi, address, price)

        dispatch(set_status_action(result.status))
    }

    return (
        <div className="container-fluid mb-5">

            <div className="row justify-content-center">
                <div className="links col-12">
                    <MintersLinks active_link='gopg' active_class={'g_active'} />
                </div>

                <div className="wallet_info row justify-content-center text-center mt-5">
                    {wallet == "" ? (
                        <button onClick={connectWalletPressed} className="col-4 site_btn g_site_btn">Connect wallet</button>
                    ) : (
                        <span><h6>wallet connected: {wallet}</h6></span>
                    )}
                </div>

                <div className="minter_area col-12 row">
                    <div className="examples col-12 col-md-6 row text-center justify-content-center">
                        <div className="g_examples_image_holder">
                            <img className="g_examples_image" src={example_img} />
                        </div>
                    </div>

                    <div className="mint_nav col-12 col-md-6 row text-center justify-content-center">
                        <span className="col-12">Hello, here you can mint some {config.geese.collection_sym}</span>
                        <span className="col-12">Current price is {config.geese.price} {config.currency}</span>
                        <span className="col-12">{minted} / {maxSupply} already minted</span>
                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className="col-4 site_btn g_site_btn higher_area_item">Connect wallet</button>
                        ) : (
                            <div>
                                <div className="counter">
                                    <button onClick={decAmount} className="counter_item g_count_btn">-</button>
                                    <span className="counter_item">{mintAmount}</span>
                                    <button onClick={incAmount} className="counter_item g_count_btn">+</button>
                                </div>
                                <button onClick={onMinMintPressed} className="col-4 site_btn g_site_btn mt-2">MINT NOW</button>
                            </div>
                        )}


                        <span className="mt-2">or you can mint for any price you want (higher than {config.geese.price})</span>

                        <div className="higher_price_area row justify-content-center mt-2">
                            {wallet == "" ? (
                                <button onClick={connectWalletPressed} className="col-4 site_btn g_site_btn higher_area_item">Connect wallet</button>
                            ) : (
                                <div>
                                    <input onChange={choosePrice} id="g_price_choose" className="col-4 price_enter higher_area_item" min={config.geese.price} placeholder="Enter your price" type="number" />
                                    <button onClick={onMoreMintPressed} className="col-4 site_btn g_site_btn higher_area_item">MINT FOR {price}</button>
                                </div>
                            )}
                        </div>

                        <span className="mt-2">you also can bet on any token</span>

                        <div className="bet_area row justify-content-center mt-2">
                            {wallet == "" ? (
                                <button onClick={connectWalletPressed} className="col-4 site_btn g_site_btn higher_area_item">Connect wallet</button>
                            ) : (
                                <div>
                                    <input id="g_bet_enter" className="col-4 price_enter higher_area_item" placeholder="Enter tokenId" type="number" />
                                    <button onClick={onBetPressed} className="col-4 site_btn g_site_btn higher_area_item">BET ON</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <span className="col-12 text-center status_area">
                    {status == '' ? ("") :
                        (
                            <div className="link_scan_holder">{status}</div>
                        )}
                </span>
            </div>

        </div>
    )
}

export default GeeseMinterPage
