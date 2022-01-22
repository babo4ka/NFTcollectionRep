import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Examples from './components/Examples';

import './MinterPage.scss';
import SiteButton from './components/SiteButton';

function MinterPage() {

  return (
    <div className="container-fluid">

      <AdvertisementBoard></AdvertisementBoard>

      <div className="minter row">
        
        <MintWindow cn=" col col-md-7"></MintWindow>

      </div>

      <h3 id="examples_txt">EXAMPLES OF COLLECTION</h3>
      <hr id="line"/>

      <Examples/>


      <div className="row welcomes">

        <div className="col col-sm welcome_page" id="ads_order">

            <h2>YOU CAN ORDER AN ADS</h2>
            <br/>
            <h3>1 month, 1 week or even 1 hour as much as you want</h3>
            <br/>
            <SiteButton cn="order_btn" text="READ MORE"></SiteButton>

        </div>


        <div className="col col-sm welcome_page" id="rebus_welc">

            <h2>TRY TO GET SYM CHEEPER</h2>
            <br/>
            <h3 >Just solve one of proposed rebuses and get one SYM</h3>
            <br/>
            <SiteButton cn="order_btn" text="Let's try!"></SiteButton>

        </div>
      </div>

      <div className="row">
        <span className="col about">тут короче будет описание, может какое-то предупреждение и тд и все такое бла бла бла бла бл абла бл</span>
      </div>
      </div>
  );
}

export default MinterPage;
