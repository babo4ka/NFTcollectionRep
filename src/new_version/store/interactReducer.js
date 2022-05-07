const initialStaete = {
    wallet:'',
    whiteListed:false,
    u_minted: 0,
    p_minted:0,
    g_minted:0,
    u_maxSupply: 0,
    p_maxSupply:0,
    g_maxSupply:0,
    status:''
}

//token data
export const SET_U_MINTED = "SET_U_MINTED"
export const SET_U_MAXSUPPLY = "SET_U_MAXSUPPLY"

export const SET_P_MINTED = "SET_P_MINTED"
export const SET_P_MAXSUPPLY = "SET_P_MAXSUPPLY"

export const SET_G_MINTED = "SET_G_MINTED"
export const SET_G_MAXSUPPLY = "SET_G_MAXSUPPLY"
//wallet
export const SET_WALLET = "SET_WALLET"
export const SET_WHITELISTED = "SET_WHITELISTED"
//status
export const SET_STATUS = "SET_STATUS"

export const interactReducer = (state = initialStaete, action) =>{
    switch(action.type){
        //token data
        case SET_U_MINTED:
            return {...state, u_minted:action.minted}

        case SET_U_MAXSUPPLY:
            return {...state, u_maxSupply:action.maxSupply}

        case SET_P_MINTED:
            return {...state, p_minted:action.minted}

        case SET_P_MAXSUPPLY:
            return {...state, p_maxSupply:action.maxSupply}

        case SET_G_MINTED:
            return {...state, g_minted:action.minted}

        case SET_G_MAXSUPPLY:
            return {...state, g_maxSupply:action.maxSupply}

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
export const set_u_minted_action = minted => ({type:SET_U_MINTED, minted})
export const set_u_maxSupply_action = maxSupply => ({type:SET_U_MAXSUPPLY, maxSupply})

export const set_p_minted_action = minted => ({type:SET_P_MINTED, minted})
export const set_p_maxSupply_action = maxSupply => ({type:SET_P_MAXSUPPLY, maxSupply})

export const set_g_minted_action = minted => ({type:SET_G_MINTED, minted})
export const set_g_maxSupply_action = maxSupply => ({type:SET_G_MAXSUPPLY, maxSupply})
//wallet
export const set_wallet_action = wallet => ({type:SET_WALLET, wallet})
export const set_whitelisted_action = whiteListed => ({type:SET_WHITELISTED, whiteListed})
//status
export const set_status_action = status => ({type:SET_STATUS, status})