import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Example from './components/Example';

import './MinterPage.scss';

function MinterPage() {

  return (
    <div className="container-fluid">
      <AdvertisementBoard></AdvertisementBoard>
      <div className="minter row">
        
        <MintWindow cn=" col-7"></MintWindow>

      </div>

      </div>
  );
}

export default MinterPage;
