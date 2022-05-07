import Web3 from 'web3';
import { set_u_maxSupply_action, set_u_minted_action } from '../store/interactReducer.js';
import { store } from '../store/store.js'
import click_img from '../click.png'
export const web3 = new Web3(Web3.givenProvider);
// const contractABI = require('../contract_abi.json');
// const contractAddress = "0x1dc7d35718ecfd067d5b5b7769e987a6a45ba3ee";

const config = require('../../config.json')

// ВАЗИМОДЕЙСТВИЯ С UEBISHA
const u_address = "0x0e21873f05abae756ad2dcc51d3c5d127cd34506"
const u_abi = require('../components/uebisha/u_contract_abi.json')


export const getUTokenCountData = async () => {
  const contract = new web3.eth.Contract(u_abi, u_address);
  const maxSupply = await contract.methods.maxSupply().call();
  const totalSupply = await contract.methods.totalSupply().call();

  store.dispatch(set_u_minted_action(totalSupply))
  store.dispatch(set_u_maxSupply_action(maxSupply))

  return {
    maxSupply: maxSupply,
    totalSupply: totalSupply
  }
}

export const u_exists = async (tokenId) =>{
  const contract = new web3.eth.Contract(u_abi, u_address);

  return await contract.methods.exists(tokenId).call()
}

export const u_mint = async (tokens, cost = 1) => {
  if (window.ethereum.chainId != config.chain_id) {
    return {
      success: false,
      status: "Switch to Rinkeby test network"
    }
  }

  const contract = new web3.eth.Contract(u_abi, u_address);
  let costFinal = web3.utils.toWei((cost * tokens.length).toString(), "ether")

  const transactionParameters = {
    ...config.tx_params,
    to: u_address, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: contract.methods.mint(tokens).encodeABI(),//make call to NFT smart contract 
    value: parseInt(costFinal).toString(16),
  };

  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
    return {
      success: true,
      status: (
        <div className="row">
        <a className="link_scan col-12" target="_blank" href={`https://rinkeby.etherscan.io/tx/${String(txHash)}`}>Go check your transaction on Etherscan<img src={click_img} alt=''></img></a>
        <a className="link_scan col-12" target="_blank" href={`https://opensea.io`}>Opensea collection page<img src={click_img} alt=''></img></a>
        </div>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message
    }
  }
}

export const u_bet = async (tokenId) => {
  if (window.ethereum.chainId != config.chain_id) {
    return {
      success: false,
      status: "Switch to Rinkeby test network"
    }
  }

  const contract = new web3.eth.Contract(u_abi, u_address);
  const cost = web3.utils.toWei("0.01", "ether")
  const transactionParameters = {
    ...config.tx_params,
    to: u_address, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: contract.methods.bet(tokenId).encodeABI(),//make call to NFT smart contract 
    value: parseInt(cost).toString(16),
  };


  try {
    const txHash = await window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });
    return {
      success: true,
      status: (
        <a className="link_scan" target="_blank" href={`https://rinkeby.etherscan.io/tx/${String(txHash)}`}>Go check your transaction on Etherscan<img src={click_img} alt=''></img></a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message
    }
  }
}


export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "Wallet connected!",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "Install Metamask",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: "Install Metamask",
    };
  }
};