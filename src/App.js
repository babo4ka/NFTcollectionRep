import MintWindow from './components/MintWindow';
import AdvertisementBoard from './components/AdvertisementBoard';
import Example from './components/Example';

import './App.css';

function App() {
  return (
    <div>
      <AdvertisementBoard></AdvertisementBoard>
      <div className="sds">
        <Example></Example>
        <div className="divider"></div>
        <MintWindow></MintWindow>
        <div className="divider"></div>
        <Example></Example>
      </div>
      </div>
  );
}

export default App;
