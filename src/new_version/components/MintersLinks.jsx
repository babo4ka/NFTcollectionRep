import { Link } from "react-router-dom"
import './MinterLinks.scss'
const MintersLinks = ({active_class, active_link}) =>{
    return(
        <div className="colntainer-fluid mt-3">
            <div className="row justify-content-center text-center">
                <Link className={`col-4 minter_link p_link ${active_link=='pndmb'?active_class:''}`} to="/pandumbs">Pandumbs</Link>
                <Link className={`col-4 minter_link u_link ${active_link=='ubsh'?active_class:''}`} to="/uebisha">Uebisha</Link>
            </div>
        </div>
    )
}

export default MintersLinks