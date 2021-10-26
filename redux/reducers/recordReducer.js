import * as TYPE from "../types/recordType";
import { GET_VACCINATION_RECORD} from "../types/recordType";

const initialState = {
    dataVaccinationRecord: []
}

const recordReducer = (state = initialState, action) =>{
    switch(action.type){
        case TYPE.GET_VACCINATION_RECORD:
            state.dataVaccinationRecord = [...action.dataVaccinationRecord]
            return {...state};
        default:
            return {...state};   
    }
}
export default recordReducer;