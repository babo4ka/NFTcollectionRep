import './css/MintWindow.scss'
import SiteButton from './SiteButton';

const MintWindow = (props) =>{
    const objClassName = "container mint_window " + props.cn;
    return(
        <div className={objClassName}>
        
        <h3 id="collection_name" className="minter_item">COLLECTION NAME</h3>

        <a href="#examples_txt" id="link_to_examples" className="minter_item">look on examples</a>

        <div id="current_tokens_count" className="minter_item">
            0/count of tokens
        </div>

        <div id="token_cost" className="minter_item">
            1 SYM costs *cost* MATIC
        </div>


        <div className="row minter_item" id="amount_chooser">
            <SiteButton isLeading={false} cn="amount_btn col-sm-auto" text="-"></SiteButton>
            <h4 className="col-sm-auto">0</h4>
            <SiteButton isLeading={false} cn="amount_btn col-sm-auto" text="+"></SiteButton>
        </div>


        <div id="total_cost" className="minter_item">
            Total cost *cost * amount* MATIC
        </div>

        {/* <button id="mint_btn" className="btn btn-primary minter_item">MINT/CONNECT WALLET</button> */}
        <SiteButton isLeading={false} cn="mint_btn fillable" text="MINT/CONNECT WALLET"></SiteButton>

        <div id="info_line" className="minter_item">
            some onformation
        </div>
    </div>
    )
}

export default MintWindow;