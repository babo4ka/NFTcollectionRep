import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MainPage.scss'
import $ from 'jquery'
import pandumbs_link_img from './pandumbs/rebus_img_4.png'
import uebisha_link_img from './uebisha/u_examples.gif'

const MainPage = () =>{

    useEffect(async ()=>{
        $('body').css('background-color', 'black')
    })

    return(
        <div className="container links_main">
            <div className="row justify-content-center text-center">
                <span className="col-12 mb-5" id="collection_choose_txt"><h5>choose collection to mint</h5></span>
                
                <div className="col-md-6 col-12 text-center justify-content-center row">
                    <Link to="/pandumbs" className="link_txt row justify-content-center link_holder">
                        <div className="link_img_holder">
                            <img src={pandumbs_link_img} className="link_img" alt="" />
                        </div>
                        <span className="mt-2 link_name">
                            PANDUMBS
                        </span>
                    </Link>
                </div>
                

                <div className="col-md-6 col-12 text-center justify-content-center row">
                    <Link to="/uebisha" className="link_txt row justify-content-center link_holder">
                        <div className="link_img_holder">
                            <img src={uebisha_link_img} className="link_img" alt="" />
                        </div>
                        <span className="mt-2 link_name">
                            UEBISHA
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainPage