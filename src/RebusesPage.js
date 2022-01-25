import SiteButton from "./components/SiteButton";
import './RebusesPage.scss';

const RebusesPage = ()=>{
    return(
        <div className="container">
            <div class="row btn_holder">
                {/* <SiteButton isLeading={true} page="/" text="Back to minter page" cn="col-6" id="back_to_minter_btn"></SiteButton> */}
                <a href="/" className="col-sm-6" id="back_to_minter_btn">Back to minter page</a>
            </div>
    
            <div className="row text_holder">
                <span id="rebuses_info_txt" className="col-sm-6">тут будет инфа о ребусах)0)</span>
            </div>
        </div>
    )
}

export default RebusesPage;