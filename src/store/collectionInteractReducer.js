const initialState = {
    minted: 0,
    maxSupply: 0,
}

export const SET_MINTED = "SET_MINTED"
export const SET_MAXSUPPLY = "SET_MAXSUPPLY"


export const collectionInteractReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MINTED:
            return {...state, minted:action.minted}

        case SET_MAXSUPPLY:
            return {...state, maxSupply:action.maxSupply}

        default:
            return state
    }
}

export const set_minted_action = minted => ({type:SET_MINTED, minted})
export const set_maxSupply_action = maxSupply => ({type:SET_MAXSUPPLY, maxSupply})