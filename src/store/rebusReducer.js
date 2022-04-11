const initialState = {
    status:'null'
}

export const SET_STATUS = "SET_STATUS"

export const rebusReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_STATUS:
            return {...state, status:action.status}

        default:
            return state
    }
}

export const set_rebus_status = status => ({type:SET_STATUS, status})