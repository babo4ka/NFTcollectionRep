import Web3 from 'web3';
import click_img from '../click.png'
export const web3 = new Web3(Web3.givenProvider || "https://speedy-nodes-nyc.moralis.io/9fcfea6f5970d20ff23ae056/eth/rinkeby");

const config = require('../../config.json')

export const exists = async (tokenId, abi, address) =>{
  const contract = new web3.eth.Contract(abi, address);

  return await contract.methods.exists(tokenId).call()
}

export const mint = async (tokens, abi, address, cost = 1) => {
  if (window.ethereum.chainId != config.chain_id) {
    return {
      success: false,
      status: "Switch to Polygon network"
    }
  }

  const contract = new web3.eth.Contract(abi, address);
  let costFinal = web3.utils.toWei((cost * tokens.length).toString(), "ether")

  const transactionParameters = {
    ...config.tx_params,
    to: address, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: contract.methods.mint(window.ethereum.selectedAddress, tokens).encodeABI(),//make call to NFT smart contract 
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

export const bet = async (tokenId, abi, address) => {
  if (window.ethereum.chainId != config.chain_id) {
    return {
      success: false,
      status: "Switch to Rinkeby test network"
    }
  }

  const contract = new web3.eth.Contract(abi, address);
  const cost = web3.utils.toWei("0.01", "ether")
  const transactionParameters = {
    ...config.tx_params,
    to: address, // Required except during contract publications.
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