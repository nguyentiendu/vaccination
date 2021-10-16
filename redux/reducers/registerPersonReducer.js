import * as TYPE from "../types/registerPersonType";

//initial data
const initialState = {
    dataRegisterPerson: [],
    dataAllPlace:[]
}

const registerPersonReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPE.CREATE_REGISTER_PERSON:
            return {...state}
        case TYPE.GET_DATA_PLACE:
            state.dataAllPlace = [...action.dataAllPlace]
            return {...state}
        default:
            return {...state};
    }
}

export default registerPersonReducer;