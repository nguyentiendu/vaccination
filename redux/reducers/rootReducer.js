import { combineReducers } from 'redux'
import vaccinesReducer from './vaccinesReducer'
import loaderReducer from "./loaderReducer";
import vaccinationPlaceReducer from './vaccinationPlaceReducer'
import authReducer from "./authReducer";
import provincesReducer from './provincesReducer'
import registerPersonReducer from './registerPersonReducer'
import accountOrganizationReducer from './accountOrganizationReducer'
import adminReducer from './adminReducer'


const rootReducer = combineReducers({
    loaderReducer,
    authReducer,
    vaccinesReducer,
    vaccinationPlaceReducer,
    provincesReducer,
    registerPersonReducer,
    accountOrganizationReducer,
    adminReducer,
})

export default rootReducer