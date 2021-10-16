import { registerServices } from '../../services/servicesAPI';
import {CREATE_REGISTER_PERSON , GET_DATA_PLACE} from '../types/registerPersonType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
//Create register person action
export const addNewRegisterPersonAction = (newDataPerson) => ({
    type: CREATE_REGISTER_PERSON,
    newDataPerson
})
//Get data place
export const getVaccinationPlaceAction = (dataAllPlace) => ({
    type: GET_DATA_PLACE,
    dataAllPlace
})
//Create register person
export const addNewRegisterPerson = (newDataPerson) => async dispatch =>{
    //turn on loading
    dispatch(openLoadingAction());
    //load 3s api
    setTimeout(() => {
        /// turn off loading
        dispatch(closeLoadingAction())
    }, 3000)

    //push up redux
    dispatch(addNewRegisterPersonAction(newDataPerson));
    return true;
}
//Get data place api
export const getAllDataPlace = () => async dispatch => {
    const res = await registerServices.getDataVaccinationPlace();
    // console.log(res.data.data);
    if(res.status === HTTP_200 && res.data.status){
        
        dispatch(getVaccinationPlaceAction(res.data.data))
    }
    
}