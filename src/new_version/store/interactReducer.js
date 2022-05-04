const initialStaete = {
    wallet:'',
    whiteListed:false,
    minted: 0,
    maxSupply: 0,
    status:''
}

//token data
export const SET_MINTED = "SET_MINTED"
export const SET_MAXSUPPLY = "SET_MAXSUPPLY"
//wallet
export const SET_WALLET = "SET_WALLET"
export const SET_WHITELISTED = "SET_WHITELISTED"
//status
export const SET_STATUS = "SET_STATUS"

export const interactReducer = (state = initialStaete, action) =>{
    switch(action.type){
        //token data
        case SET_MINTED:
            return {...state, minted:action.minted}

        case SET_MAXSUPPLY:
            return {...state, maxSupply:action.maxSupply}

        //wallet
        case SET_WALLET:
            return {...state, wallet:action.wallet}

        case SET_WHITELISTED:
            return {...state, whiteListed:action.whiteListed}

        //status
        case SET_STATUS:
            return {...state, status:action.status}

        default:
            return state
    }
}

//token data
export const set_minted_action = minted => ({type:SET_MINTED, minted})
export const set_maxSupply_action = maxSupply => ({type:SET_MAXSUPPLY, maxSupply})
//wallet
export const set_wallet_action = wallet => ({type:SET_WALLET, wallet})
export const set_whitelisted_action = whiteListed => ({type:SET_WHITELISTED, whiteListed})
//status
export const set_status_action = status => ({type:SET_STATUS, status})