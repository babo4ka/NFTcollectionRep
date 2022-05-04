import Web3 from 'web3';
import {store} from '../store/store.js'

export const web3 = new Web3(Web3.givenProvider);
// const contractABI = require('../contract_abi.json');
// const contractAddress = "0x1dc7d35718ecfd067d5b5b7769e987a6a45ba3ee";

const config = require('../../config.json')

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