import './css/MintWindow.scss'
import SiteButton from './SiteButton';

const MintWindow = (props) =>{
    const objClassName = "container mint_window " + props.cn;

    let walletConnected = props.walletConnected;

    return(
        <div className={objClassName}>
        
            <h3 id="collection_name" className="minter_item">COLLECTION NAME</h3>

            <a href="#examples_txt" id="link_to_examples" className="minter_item">look on examples</a>

            <div id="current_tokens_count" className="minter_item">
                {props.totalSupply} / {props.maxSupply} are minted
            </div>


            {props.whiteListed == true?(
                <div className="container">
                    <div className="row justify-content-center">
                        <span className="col-12">Congratz, You're whitelisted and can mint NFT for free!</span>
                        <SiteButton id="mint_btn" cn="mint_btn fillable col-4 mt-4" text="GET NFT"></SiteButton>
                    </div>
                </div>
            ):
            (
                <div>
                <div id="token_cost" className="minter_item">
                1 SYM costs 50 MATIC
            </div>

            {walletConnected == true?(
                <div>
                    <div className="row minter_item" id="amount_chooser">
                        <SiteButton func={()=>props.decMintAmount()} cn="amount_btn col-sm-auto" tn="btn_text_amount" text="-"></SiteButton>
                        <h4 className="col-sm-auto">{props.mintAmount}</h4>
                        <SiteButton func={()=>props.incMintAmount()} cn="amount_btn col-sm-auto" tn="btn_text_amount" text="+"></SiteButton>
                    </div>
            
            
                    <div id="total_cost" className="minter_item">
                        Total cost {props.totalCost} MATIC
                    </div>
            
                    <SiteButton id="mint_btn" cn="mint_btn fillable" text="GET NFT"></SiteButton>
                </div>
            ):(
                <div>
                    <SiteButton func={()=>props.onConnect()} text="Connect wallet"></SiteButton>    
                </div>
            )}
            </div>
            )}
           


            <div id="info_line" className="minter_item">
                {props.status}
            </div>
        </div>
    )
}

export default MintWindow;