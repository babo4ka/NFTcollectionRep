import './UebishaMinterPage.scss'
import MintersLinks from '../MintersLinks'
import { useEffect, useState } from 'react'
import { getCurrentWalletConnected } from '../../utils/interact.js'
import { useDispatch, useSelector } from 'react-redux'
import { set_status_action, set_wallet_action } from '../../store/interactReducer.js'
import $ from 'jquery'
const config = require('../../../config.json')


const UebishaMinterPage = () =>{

    const [status, setStatus] = useState('')
    const wallet = useSelector(state => state.interact.wallet)
    
    const dispatch = useDispatch()

    useEffect(async ()=>{
        const {address, status} = await getCurrentWalletConnected()
        setStatus(status)
        dispatch(set_status_action(status))
        dispatch(set_wallet_action(address))

        $(window).ready(()=>{
            console.log("sas")
            $('body').css('background-color', '#392570')
        })
    }, [])

    const [price, setPrice] = useState(50)

    const choosePrice = () =>{
        setPrice($('#u_price_choose').val()>50?$('#u_price_choose').val():50)
    }

    return (
        <div className="container-fluid mb-5">

            <div className="row justify-content-center">
                <div className="links col-12">
                    <MintersLinks active_link='ubsh' active_class={'u_active'}/>
                </div>

                <div className="wallet_info row justify-content-center mt-5">
                    {wallet==""?(
                        <button className="col-4 site_btn u_site_btn">Connect wallet</button>
                    ):(
                        <span><h4>wallet connected: {wallet}</h4></span>
                    )}
                </div>

                <div className="minter_area col-12 row">
                    <div className="examples col-12 col-md-6 row text-center justify-content-center">
                        {/* <div className="p_examples_image_holder">
                            <img className="p_examples_image" src={example_img} />
                        </div>
                        <span className="mt-3">These are examples of 20 random tokens</span> */}
                    </div>

                    <div className="mint_nav col-12 col-md-6 row text-center justify-content-center">
                        <span className="col-12">Hello, here you can mint some {config.uebisha.collection_sym}</span>
                        <span className="col-12">Current price is {config.uebisha.price} {config.currency}</span>
                        <span className="col-12">0/0 already minted</span>
                        <div className="counter">
                            <span className="counter_item u_count_btn">-</span>
                            <span className="counter_item">1</span>
                            <span className="counter_item u_count_btn">+</span>
                        </div>
                        <button className="col-4 site_btn u_site_btn mt-2">MINT NOW</button>
                        <span className="mt-2">or you can mint for any price you want (higher than {config.uebisha.price})</span>

                        <div className="higher_price_area row justify-content-center mt-2">
                            <input onChange={choosePrice} id="u_price_choose" className="col-4 price_enter higher_area_item" min={config.uebisha.price} placeholder="Enter your price" type="number" />
                            <button className="col-4 site_btn u_site_btn higher_area_item">MINT FOR {price}</button>
                        </div>

                        <span className="mt-2">you also can bet on any token</span>

                        <div className="bet_area row justify-content-center mt-2">
                            <input className="col-4 price_enter higher_area_item" placeholder="Enter tokenId" type="number" />
                            <button className="col-4 site_btn u_site_btn higher_area_item">BET ON</button>
                        </div>
                    </div>
                </div>

                <span className="status_area col-12 text-center mt-3">
                    {status==''?(""):
                    (
                        <h4>{status}</h4>
                    )}
                </span>
            </div>

        </div>
    )
}

export default UebishaMinterPage
