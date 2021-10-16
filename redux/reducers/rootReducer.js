import { combineReducers } from 'redux'
import vaccinesReducer from './vaccinesReducer'
import loaderReducer from "./loaderReducer";
import vaccinationPlaceReducer from './vaccinationPlaceReducer'
import authReducer from "./authReducer";
import provincesReducer from './provincesReducer'
import registerPersonReducer from './registerPersonReducer'
import accountOrganizationReducer from './accountOrganizationReducer'


const rootReducer = combineReducers({
    loaderReducer,
    authReducer,
    vaccinesReducer,
    vaccinationPlaceReducer,
    provincesReducer,
    registerPersonReducer,
    accountOrganizationReducer,
})

export default rootReducer