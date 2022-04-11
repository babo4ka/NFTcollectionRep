import Web3 from 'web3';
import { set_rebus_status } from '../store/rebusReducer';
import {store} from '../store/store'

export const web3 = new Web3(Web3.givenProvider);
const contractABI = require('../contract_abi.json');
const contractAddress = "0x1dc7d35718ecfd067d5b5b7769e987a6a45ba3ee";

const rebusesABI = require('../rebuses_abi.json');
const rebusesAddress = "0x0bb5252007c28d463ed3f01b7256f1b418c662f4"

const config = require('../config.json')

export const bet = async (tokenId) => {
  if (window.ethereum.chainId != 4) {
    return {
      success: false,
      status: "Switch to Rinkeby test network"
    }
  }

  const contract = await new web3.eth.Contract(contractABI, contractAddress);

  // const transactionParameters = {
  //   to: contractAddress, // Required except during contract publications.
  //   from: window.ethereum.selectedAddress, // must match user's active address.
  //   data: window.contract.methods.bet(tokenId).encodeABI(),//make call to NFT smart contract 
  //   value:parseInt(0.25).toString(16),
  // };

}

export const getTokenCountData = async () => {
  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const maxSupply = await window.contract.methods.maxSupply().call();
  const totalSupply = await window.contract.methods.totalSupply().call();


  return {
    maxSupply: maxSupply,
    totalSupply: totalSupply
  }
}

export const isWalletWhiteListed = async (wallet) => {
  window.contract = new web3.eth.Contract(contractABI, contractAddress);
  const whiteListed = await window.contract.methods.whiteListed(wallet).call();

  return {
    whiteListed: whiteListed
  }
}

export const getTokenData = async (tokenId) => {
  window.contract = new web3.eth.Contract(contractABI, contractAddress);

  let tokenURI = await window.contract.methods.tokenURIforData(tokenId).call();

  tokenURI = `https://ipfs.io/ipfs/${tokenURI.split("ipfs://")[1]}`;

  const tokenMetadata = await fetch(tokenURI).then((response) => response.json());

  const tokenImage = `https://ipfs.io/ipfs/${tokenMetadata["image"].split("ipfs://")[1]}`

  let tokenOwner;
  let tokenMintedBy;

  if (await window.contract.methods._minted(tokenId).call() == true) {
    tokenOwner = await window.contract.methods.ownerOf(tokenId).call();
    tokenMintedBy = await window.contract.methods.addressMinted(tokenId).call();
  }



  return {
    tokenMetadata: tokenMetadata,
    tokenImage: tokenImage,
    tokenOwner: tokenOwner,
    tokenMintedBy: tokenMintedBy
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


//Rebuses interact
export const getRebusData = async () => {
  const contract = new web3.eth.Contract(rebusesABI, rebusesAddress);

  var rebusData = [];

  for (let i = 1; i <= 2; i++) {
    const _rebusData = await contract.methods.rebuses(i).call();
    rebusData.push(_rebusData);
  }


  return {
    rebusData: rebusData
  }
}

export const startRebusSolving = async (rebusNum) => {
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  if (chainId != 4) {
    return {
      success: false,
      status: "Switch to Rinkeby test network"
    }
  }

  const contract = new web3.eth.Contract(rebusesABI, rebusesAddress);

  var cost = 0.0001;
  //var cost = config.rebusPrice;
  cost = web3.utils.toWei(cost.toString(), "ether")


  let transactionParameters = config.tx_params;

  transactionParameters = {
    ...transactionParameters,
    to: rebusesAddress,
    from: window.ethereum.selectedAddress,
    data: contract.methods.startRebusSolving(rebusNum).encodeABI(),//make call to NFT smart contract 
    value: parseInt(cost).toString(16),
  };

  const result = await contract.methods.startRebusSolving(rebusNum)
  .send({from:window.ethereum.selectedAddress, value:parseInt(cost)})
  .on('transactionHash', ()=>{
    store.dispatch(set_rebus_status('pending'))
    return{
      success:true,
      status:""
    }
  })
  .on('confirmation', ()=>{
    store.dispatch(set_rebus_status('solving'))
    console.log('i dispatched to solving')
    // return{
    //   success:true,
    //   status:""
    // }
  })
  .on('error', err=>{
    store.dispatch(set_rebus_status('null'))
    return{
      success:false,
      status: "Something went wrong: " + err.message
    }
  });


  return{
    success:result.success,
    status:result.status
  }

  // try {
  //   const txHash = await window.ethereum
  //     .request({
  //       method: 'eth_sendTransaction',
  //       params: [transactionParameters]
  //     })

  //   return {
  //     success: true,
  //     status: ""
  //   }

  // } catch (error) {
  //   return {
  //     success: false,
  //     status: "Something went wrong: " + error.message
  //   }
  // }

}