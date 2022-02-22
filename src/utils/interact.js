import Web3 from 'web3';

export const web3 = new Web3("https://speedy-nodes-nyc.moralis.io/9fcfea6f5970d20ff23ae056/eth/rinkeby");

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