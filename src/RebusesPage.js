import SiteButton, { OpenRebusButton } from "./components/SiteButton";
import './RebusesPage.scss';
import RebusWindow from "./components/RebusWindow";
import React, { useEffect, useState } from 'react';


import { 
    connectWallet, 
    getCurrentWalletConnected
} from './utils/interact';
import { AllRebuses } from "./AllRebuses";



const Rebus = (props) =>{

    function rebusNumber(){
        var rebusWindow = document.getElementById(`rebusWindow${props.number}`)
        rebusWindow.addEventListener('shown.bs.modal', function (event) {
        // Кнопка, запускающая модальное окно
        var button = event.relatedTarget
        // Извлечь информацию из атрибутов data-bs- *
        var number = button.getAttribute('data-bs-whatever')
        // При необходимости вы можете инициировать запрос AJAX здесь
        // а затем выполните обновление в обратном вызове.
        //
        // Обновите содержимое модального окна.
        var modalTitle = rebusWindow.querySelector('.modal-title')

        modalTitle.textContent = `This is rebus number ${number}`;

        })
    }

    const id = `#rebusWindow${props.number}`

    return(
        <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 rebus_body">
            <div className="card-body card_body">
                <h1 className="rebus_number">#{props.number}</h1>
                <p className="card-text rebus_desc">Try to solve this rebus for 2 MATIC and get one SYM</p>
                <p className="rebus_desc">Total tries:</p>
                {props.walletConnected == true?(
                <OpenRebusButton 
                setNumber={()=>rebusNumber()} 
                data_bs_toggle="modal" 
                data_bs_target={id}
                data_bs_whatever={props.number}
                cn="fillable" 
                text="open rebus"></OpenRebusButton>
                ):(
                    <SiteButton
                    func={()=>props.func()}
                    text="Connect wallet"
                    >
                    </SiteButton>
                )}

            </div>
        </div>
    )
}

const RebusesPage = (props)=>{

    const [wallet, setWallet] = useState();
    const [status, setStatus] = useState();
  
    useEffect(async()=>{
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
  
      addWalletListener();
    }, [])
  
    function addWalletListener() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setWallet(accounts[0]);
          } else {
            setWallet("");
          }
        });
      } else {
  
      }
    }
  
    const connectWalletPressed = async () => {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
  };

  const RebusesAbout = ()=>{
      return (
          <div>
            <div className="row justify-content-center text_holder">
                <div className="col-12">
                    <span>Hello! Feel free to try solving any of these rebuses</span><br/>
                    <span>They are quite simple</span><br/>
                    <span>There will be some cards. You will have some time to put them in right place</span><br/>
                    <span>But there will be no prompts which places are right)0)</span><br/>
                    <span>It's time to get your brain on!</span><br/>
                    <span>Just pay 2 MATIC to open the rebus and go ahead!</span><br/>
                    <span>If you will solve the rebus, you'll get one SYM and 50% of money other guys spent on tries</span><br/>
                    <span>Once you get solve this rebus, ypu will be whitelisted and will be able to mint free token</span>
                </div>
            </div>
          </div>
      )
  }

  const [rebusNum, setRebusNum] = useState(1);


  const windows = AllRebuses().rebusData.map((item, itemI)=>
  <RebusWindow rebusData={item} number={itemI+1}/>)

  const opens = AllRebuses().rebusData.map((item, itemI)=>
  <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={itemI+1}/>)
    
  return(
        <div className="container">
            <div class="row btn_holder">
                <a href="/" className="col-sm-6" id="back_to_minter_btn">Back to minter page</a>
            </div>
        
            <RebusesAbout></RebusesAbout>

            <div className="row info_holder justify-content-center mt-5">
                <span id="info_label" className="col-6">{status}</span>
            </div>
    
            <div className="container cards_holder">
                <div className="row cards_row">
                    {/* <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={1}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={2}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={3}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={4}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={5}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={6}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={7}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={8}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={9}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={10}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={11}></Rebus>
                    <Rebus func={()=>connectWalletPressed()} walletConnected={wallet!=""} number={12}></Rebus> */}
                    {opens}
                </div>
            </div>
            {/* rebus windows */}
            {windows}
        </div>
    )
}

export default RebusesPage;