import MintersLinks from '../MintersLinks'
import './PandumbsMinterPage.scss'
const config = require('../../../config.json')
const PandumbsMinterPage = () => {
    return (
        <div className="container-fluid">

            <div className="row justify-content-center">
                <div className="links col-12">
                    <MintersLinks />
                </div>
                <div className="minter_area col-12 row">
                    <div className="examples col-12 col-md-6">

                    </div>

                    <div className="mint_nav col-12 col-md-6 row text-center justify-content-center">
                        <span className="col-12">Hello, here you can mint some {config.pandumbs.collection_sym}</span>
                        <span className="col-12">Current price is {config.pandumbs.price} {config.currency}</span>
                        <span className="col-12">0/0 already minted</span>
                        <div className="counter">
                            <span className="counter_item p_count_btn">-</span>
                            <span className="counter_item">1</span>
                            <span className="counter_item p_count_btn">+</span>
                        </div>
                        <button className="col-4 mint_btn p_mint_btn mt-2">MINT NOW</button>
                        <span className="mt-2">or you can mint for any price you want (higher than {config.pandumbs.price})</span>

                        <div className="higher_price_area row justify-content-center mt-2">
                            <input className="col-4 price_enter higher_area_item" min={config.pandumbs.price} placeholder="Enter your price" type="number" />
                            <button className="col-4 mint_btn p_mint_btn higher_area_item">MINT FOR </button>
                        </div>

                        <span className="mt-2">you also can bet on any token</span>

                        <div className="bet_area row justify-content-center mt-2">
                            <input className="col-4 price_enter higher_area_item" placeholder="Enter tokenId" type="number" />
                            <button className="col-4 mint_btn p_mint_btn higher_area_item">BET ON</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PandumbsMinterPage
