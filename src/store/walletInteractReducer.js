const initialStaete = {
    wallet:''
}

export const SET_WALLET = "SET_WALLET"

export const walletInteractReducer = (state = initialStaete, action) =>{
    switch(action.type){
        case SET_WALLET:
            return {...state, wallet:action.wallet}

        default:
            return state
    }
}

export const set_wallet_action = wallet => ({type:SET_WALLET, wallet})