import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Example from './components/Example';

import './App.scss';

function App() {
  const sds_item_className = "sds_item";
  return (
    <div className="container-fluid">
      <AdvertisementBoard></AdvertisementBoard>
      <div className="sds row">
        {/* <div className="example_box sds_item col">
        <Example></Example>
        </div> */}
        
        <MintWindow cn={sds_item_className + " col-7"}></MintWindow>

        {/* <div className="example_box sds_item col">
        <Example></Example>
        </div> */}
      </div>
      </div>
  );
}

export default App;
