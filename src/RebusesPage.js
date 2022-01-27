import SiteButton from "./components/SiteButton";
import './RebusesPage.scss';

const Rebus = (props)=>{
    const ttt = false;
    return(
        <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 rebus_body">
            <div className="card-body card_body">
                <h1 className="rebus_number">#{props.number}</h1>
                <p className="card-text rebus_desc">Try to solve this rebus for 2 MATIC and get one SYM</p>
                <SiteButton cn="fillable" text="open rebus"></SiteButton>
                {ttt==true?
                (
                <div>Is being solved now...</div>
                ):
                ("")
                }
                
            </div>
        </div>
    )
}

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

            <div className="container cards_holder">
                <div className="row cards_row">
                    <Rebus number="1"></Rebus>
                    <Rebus number="2"></Rebus>
                    <Rebus number="3"></Rebus>
                    <Rebus number="4"></Rebus>
                    <Rebus number="5"></Rebus>
                    <Rebus number="6"></Rebus>
                    <Rebus number="7"></Rebus>
                    <Rebus number="8"></Rebus>
                    <Rebus number="9"></Rebus>
                    <Rebus number="10"></Rebus>
                    <Rebus number="11"></Rebus>
                    <Rebus number="12"></Rebus>
                    <Rebus number="13"></Rebus>
                    <Rebus number="14"></Rebus>
                    <Rebus number="15"></Rebus>
                    <Rebus number="16"></Rebus>
                    <Rebus number="17"></Rebus>
                    <Rebus number="18"></Rebus>
                </div>
            </div>
        </div>
    )
}

export default RebusesPage;