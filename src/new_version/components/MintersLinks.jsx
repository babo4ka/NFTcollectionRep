import { Link } from "react-router-dom"
import './MinterLinks.scss'
import $ from 'jquery'
import { useEffect, useState } from "react"

const MintersLinks = ({active_class, active_link}) =>{

    const [links, setLinks] = useState(['Pandumbs', 'Uebisha', 'PocketPixelGeese'])

    useEffect(async ()=>{
        $(window).resize(()=>{
            if($(window).width()<700){
                setLinks(['PNDMB', 'UBSH', 'PoPg'])
            }else{
                setLinks(['Pandumbs', 'Uebisha', 'PocketPixelGeese'])
            }
        })

        $(window).ready(()=>{
            if($(window).width()<700){
                setLinks(['PNDMB', 'UBSH', 'PoPg'])
            }else{
                setLinks(['Pandumbs', 'Uebisha', 'PocketPixelGeese'])
            }
        })
    }, [])

    return(
        <div className="colntainer-fluid mt-3">
            <div className="row justify-content-center text-center">
                <Link className={`col-4 minter_link p_link ${active_link=='pndmb'?active_class:''}`} to="/pandumbs">{links[0]}</Link>
                <Link className={`col-4 minter_link u_link ${active_link=='ubsh'?active_class:''}`} to="/uebisha">{links[1]}</Link>
                <Link className={`col-4 minter_link g_link ${active_link=='gopg'?active_class:''}`} to="/geese">{links[2]}</Link>
            </div>
        </div>
    )
}

export default MintersLinks