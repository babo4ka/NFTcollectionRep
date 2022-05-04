import { Link } from "react-router-dom"
import './MinterLinks.scss'
const MintersLinks = () =>{
    return(
        <div className="colntainer-fluid mt-3">
            <div className="row justify-content-center text-center">
                <Link className="col-4 minter_link p_link p_active" to="/pandumbs">Pandumbs</Link>
                <Link className="col-4 minter_link u_link" to="/uebisha">Uebisha</Link>
            </div>
        </div>
    )
}

export default MintersLinks