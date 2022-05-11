import './UebishaMinterPage.scss'
import MintersLinks from '../MintersLinks'
import { useEffect, useState } from 'react'
import { connectWallet, getCurrentWalletConnected, bet, exists, mint, web3 } from '../../utils/interact.js'
import { useDispatch, useSelector } from 'react-redux'
import { set_status_action, set_wallet_action, set_u_minted_action, set_u_maxSupply_action } from '../../store/interactReducer.js'
import example_img from './u_examples.gif'
import $ from 'jquery'
const config = require('../../../config.json')

const address = "0x9605B523088396EE5D90be1b765D15B3fAC31087"
const abi = require('./u_contract_abi.json')

const UebishaMinterPage = () => {

    const status = useSelector(state => state.interact.status)
    const wallet = useSelector(state => state.interact.wallet)

    const minted = useSelector(state => state.interact.u_minted)
    const maxSupply = useSelector(state => state.interact.u_maxSupply)

    const dispatch = useDispatch()

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected()
        dispatch(set_status_action(status))
        dispatch(set_wallet_action(address))

        $(window).ready(() => {
            $('body').css('background-color', '#392570')
        })

        await getTokenCountData()
        addWalletListener()
    }, [])

    const getTokenCountData = async () => {
        const contract = new web3.eth.Contract(abi, address);
        const maxSupply = await contract.methods.maxSupply().call();
        const totalSupply = await contract.methods.totalSupply().call();

        dispatch(set_u_minted_action(totalSupply))
        dispatch(set_u_maxSupply_action(maxSupply))
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

    const minimalPrice = config.uebisha.price
    const [price, setPrice] = useState(minimalPrice)

    const choosePrice = () => {
        setPrice($('#u_price_choose').val() > minimalPrice ? $('#u_price_choose').val() : minimalPrice)
    }

    const maxMintAmount = config.uebisha.maxMintAmount
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
        let bet_id = Number($("#u_bet_enter").val())
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

    const [minting, setMinting] = useState(false)

    const onMinMintPressed = async () => {
        setMinting(true)
        let tokens = []
        for (let i = 0; i < mintAmount; i++) {
            let token = await generateToken(tokens)
            tokens.push(token)
        }

        const result = await mint(tokens, abi, address)
        setMinting(false)
        dispatch(set_status_action(result.status))
    }

    const onMoreMintPressed = async () => {
        setMinting(true)
        let tokens = []
        for (let i = 0; i < mintAmount; i++) {
            let token = await generateToken(tokens)
            tokens.push(token)
        }

        const result = await mint(tokens, abi, address, price)
        setMinting(false)
        dispatch(set_status_action(result.status))
    }

    const [marginStyles, setMarginStyles] = useState($(window).width() < 768 ? 'mt-2' : '')

    useEffect(async () => {
        $(window).resize(() => {
            if ($(window).width() < 768) {
                setMarginStyles('mt-2')
            } else {
                setMarginStyles('')
            }
        })
    }, [])

    return (
        <div className="container-fluid mb-5 p-0">

            <div className="row justify-content-center">
                <div className="links col-12">
                    <MintersLinks active_link='ubsh' active_class={'u_active'} />
                </div>

                <div className="wallet_info row justify-content-center text-center mt-5">
                    {wallet == "" ? (
                        <button onClick={connectWalletPressed} className="col-12 col-md-4 site_btn u_site_btn">Connect wallet</button>
                    ) : (
                        <span><h6>wallet connected: {wallet}</h6></span>
                    )}
                </div>

                <div className="minter_area p-0 justify-content-center col-12 row">
                    <div className="examples col-12 col-md-6 p-0 row text-center justify-content-center">
                        <div className="u_examples_image_holder">
                            <img className="u_examples_image" src={example_img} />
                        </div>
                    </div>

                    <div className={`mint_nav col-12 col-md-6 row text-center justify-content-center ${marginStyles}`}>
                        <span className={`col-12 ${marginStyles}`}>Hello, here you can mint some {config.uebisha.collection_sym}</span>
                        <span className={`col-12 ${marginStyles}`}>Current price is {config.uebisha.price} {config.currency}</span>
                        <span className={`col-12 ${marginStyles}`}>{minted} / {maxSupply} already minted</span>
                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className={`${marginStyles} col-12 col-md-4 site_btn u_site_btn`}>Connect wallet</button>
                        ) : (
                            <div>
                                <div className={`counter ${marginStyles}`}>
                                    <button onClick={decAmount} className="counter_item u_count_btn">-</button>
                                    <span className="counter_item">{mintAmount}</span>
                                    <button onClick={incAmount} className="counter_item u_count_btn">+</button>
                                </div>
                                <button onClick={onMinMintPressed} className={`${marginStyles} col-12 col-md-4 site_btn u_site_btn`}>{minting?"MINTING...":"MINT NOW"}</button>
                            </div>
                        )}


                        <span className="mt-2">or you can mint for any price you want (higher than {config.uebisha.price})</span>


                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className={`${marginStyles} col-12 col-md-4 site_btn u_site_btn higher_area_item`}>Connect wallet</button>
                        ) : (
                            <div>
                                <div className="higher_price_area row justify-content-center mt-2">
                                    <input onChange={choosePrice} id="u_price_choose" className="col-12 col-md-4 price_enter higher_area_item" min={config.uebisha.price} placeholder="Enter your price" type="number" />
                                    <button onClick={onMoreMintPressed} className={`${marginStyles} col-12 col-md-4 site_btn u_site_btn higher_area_item`}>{minting?"MINTING...":`MINT FOR ${price}`}</button>
                                </div>
                            </div>
                        )}


                        <span className="mt-2">you also can bet on any token</span>


                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className={`${marginStyles} col-12 col-md-4 site_btn u_site_btn higher_area_item`}>Connect wallet</button>
                        ) : (
                            <div>
                                <div className="bet_area row justify-content-center mt-2">
                                    <input id="u_bet_enter" className="col-12 col-md-4 price_enter higher_area_item" placeholder="Enter tokenId" type="number" />
                                    <button onClick={onBetPressed} className={`${marginStyles} col-12 col-md-4 site_btn u_site_btn higher_area_item`}>BET ON</button>
                                </div>
                            </div>
                        )}

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

export default UebishaMinterPage
