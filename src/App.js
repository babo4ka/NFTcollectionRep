import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Example from './components/Example';

import './App.css';

function App() {
  const sds_item_className = "sds_item";
  return (
    <div>
      <AdvertisementBoard></AdvertisementBoard>
      <div className="sds">
        <div className="example_box sds_item">
        <Example></Example>
        </div>
        
        <MintWindow cn={sds_item_className}></MintWindow>

        <div className="example_box sds_item">
        <Example></Example>
        </div>
      </div>
      </div>
  );
}

export default App;
