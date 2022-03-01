import Web3 from 'web3';

export const web3 = new Web3("https://speedy-nodes-nyc.moralis.io/9fcfea6f5970d20ff23ae056/eth/rinkeby");
const contractABI = require('../contract_abi.json');
const contractAddress = "0x1dc7d35718ecfd067d5b5b7769e987a6a45ba3ee";


export const getTokenCountData = async()=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const maxSupply = await window.contract.methods.maxSupply().call();
  const totalSupply = await window.contract.methods.totalSupply().call();

  return{
    maxSupply:maxSupply,
    totalSupply:totalSupply
  }
}

export const isWalletWhiteListed = async(wallet)=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const whiteListed = await window.contract.methods.whiteListed(wallet).call();

  return{
    whiteListed:whiteListed
  }
}

export const getTokenData = async (tokenId)=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  let tokenURI = await window.contract.methods.tokenURIforData(tokenId).call();

  tokenURI = `https://ipfs.io/ipfs/${tokenURI.split("ipfs://")[1]}`;

  const tokenMetadata = await fetch(tokenURI).then((response)=>response.json());

  const tokenImage = `https://ipfs.io/ipfs/${tokenMetadata["image"].split("ipfs://")[1]}`

  let tokenOwner;
  let tokenMintedBy;

  if(await window.contract.methods._minted(tokenId).call() == true){
    tokenOwner = await window.contract.methods.ownerOf(tokenId).call();
    tokenMintedBy = await window.contract.methods.addressMinted(tokenId).call();
  }

  

  return{
    tokenMetadata:tokenMetadata,
    tokenImage:tokenImage,
    tokenOwner:tokenOwner,
    tokenMintedBy:tokenMintedBy
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