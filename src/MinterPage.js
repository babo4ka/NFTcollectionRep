import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Examples from './components/Examples';

import './MinterPage.scss';

function MinterPage() {

  return (
    <div className="container-fluid">

      <AdvertisementBoard></AdvertisementBoard>

      <div className="minter row">
        
        <MintWindow cn=" col col-md-7"></MintWindow>

      </div>

      <h3 id="examples_txt">EXAMPLES OF COLLECTION</h3>
      <hr id="line"></hr>

      <Examples/>
      </div>
  );
}

export default MinterPage;
