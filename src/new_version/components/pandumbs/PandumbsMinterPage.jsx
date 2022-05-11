import MintersLinks from '../MintersLinks'
import './PandumbsMinterPage.scss'
import { useEffect, useState } from 'react'
import example_img from './p_examples.gif'
import { connectWallet, getCurrentWalletConnected, bet, exists, mint, web3 } from '../../utils/interact.js'
import { useDispatch, useSelector } from 'react-redux'
import { set_status_action, set_wallet_action, set_p_maxSupply_action, set_p_minted_action } from '../../store/interactReducer.js'
import $ from 'jquery'
const config = require('../../../config.json')


const address = "0x96a55Ca510C44834c931859E298555324027e26C"
const abi = require('./p_contract_abi.json')
const PandumbsMinterPage = () => {


    const status = useSelector(state => state.interact.status)
    const wallet = useSelector(state => state.interact.wallet)

    const minted = useSelector(state => state.interact.p_minted)
    const maxSupply = useSelector(state => state.interact.p_maxSupply)

    const dispatch = useDispatch()

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected()
        dispatch(set_status_action(status))
        dispatch(set_wallet_action(address))

        $(window).ready(() => {
            $('body').css('background-color', '#0B0B0C')
        })

        await getTokenCountData()
        addWalletListener()
    }, [])

    const getTokenCountData = async () => {
        const contract = new web3.eth.Contract(abi, address);
        const maxSupply = await contract.methods.maxSupply().call();
        const totalSupply = await contract.methods.totalSupply().call();
      
        dispatch(set_p_minted_action(totalSupply))
        dispatch(set_p_maxSupply_action(maxSupply))
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

    const minimalPrice = config.pandumbs.price
    const [price, setPrice] = useState(minimalPrice)

    const choosePrice = () => {
        setPrice($('#p_price_choose').val() > minimalPrice ? $('#p_price_choose').val() : minimalPrice)
    }

    const maxMintAmount = config.pandumbs.maxMintAmount
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
        let bet_id = Number($("#p_bet_enter").val())
        if (bet_id < 1 || bet_id > maxSupply) {
            dispatch(set_status_action(`Please, enter number between 1 and ${maxSupply}`))
            return
        }
        const result = await bet(bet_id, abi, address)
        dispatch(set_status_action(result.status))
    }

    const generateToken = async (tokens) => {
        let token = Math.floor(Math.random() * 5000) + 1
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

        const result = await mint(tokens, abi, address, price)
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

    const [marginStyles, setMarginStyles] = useState($(window).width()<768?'mt-2':'')

    useEffect(async ()=>{
        $(window).resize(()=>{
            if($(window).width()<768){
                setMarginStyles('mt-2')
            }else{
                setMarginStyles('')
            }
        })
    }, [])

    return (
        <div className="container-fluid mb-5 p-0">

            <div className="row justify-content-center">
                <div className="links col-12">
                    <MintersLinks active_link='pndmb' active_class={'p_active'} />
                </div>

                <div className="wallet_info row justify-content-center text-center mt-5">
                    {wallet == "" ? (
                        <button onClick={connectWalletPressed} className="col-12 col-md-4 site_btn p_site_btn">Connect wallet</button>
                    ) : (
                        <span><h6>wallet connected: {wallet}</h6></span>
                    )}
                </div>

                <div className="minter_area p-0 justify-content-center col-12 row">
                    <div className="examples col-12 col-md-6 row text-center justify-content-center">
                        <div className="p_examples_image_holder">
                            <img className="p_examples_image" src={example_img} />
                        </div>
                    </div>

                    <div className={`${marginStyles} mint_nav col-12 col-md-6 row text-center justify-content-center`}>
                        <span className={`col-12 ${marginStyles}`}>Hello, here you can mint some {config.pandumbs.collection_sym}</span>
                        <span className={`col-12 ${marginStyles}`}>Current price is {config.pandumbs.price} {config.currency}</span>
                        <span className={`col-12 ${marginStyles}`}>{minted} / {maxSupply} already minted</span>

                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className={`${marginStyles} col-12 col-md-4 site_btn p_site_btn higher_area_item`}>Connect wallet</button>
                        ) : (
                            <div>
                                <div className={`counter ${marginStyles}`}>
                                    <button onClick={decAmount} className="counter_item p_count_btn">-</button>
                                    <span className="counter_item">{mintAmount}</span>
                                    <button onClick={incAmount} className="counter_item p_count_btn">+</button>
                                </div>
                                <button onClick={onMinMintPressed} className={`${marginStyles} col-12 col-md-4 site_btn p_site_btn`}>{minting?"MINTING...":"MINT NOW"}</button>
                            </div>
                        )}

                        <span className="mt-2">or you can mint for any price you want (higher than {config.pandumbs.price})</span>

                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className={`${marginStyles} col-12 col-md-4 site_btn p_site_btn`}>Connect wallet</button>
                        ) : (
                            <div>
                                <div className="higher_price_area row justify-content-center mt-2">
                                    <input onChange={choosePrice} id="p_price_choose" className="col-12 col-md-4 price_enter higher_area_item" min={config.pandumbs.price} placeholder="Enter your price" type="number" />
                                    <button onClick={onMoreMintPressed} id="p_montfor_btn" className={`${marginStyles} col-12 col-md-4 site_btn p_site_btn higher_area_item`}>{minting?"MINTING...":`MINT FOR ${price}`}</button>
                                </div>
                            </div>
                        )}

                        <span className="mt-2">you also can bet on any token</span>

                        {wallet == "" ? (
                            <button onClick={connectWalletPressed} className={`${marginStyles} col-12 col-md-4 site_btn p_site_btn`}>Connect wallet</button>
                        ) : (
                            <div>
                                <div className="bet_area row justify-content-center mt-2">
                                    <input id="p_bet_enter" className="col-12 col-md-4 price_enter higher_area_item" placeholder="Enter tokenId" type="number" />
                                    <button onClick={onBetPressed} className={`${marginStyles} col-12 col-md-4 site_btn p_site_btn higher_area_item`}>BET ON</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <span className="col-12 text-center status_area">
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
