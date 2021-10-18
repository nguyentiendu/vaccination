import { registerServices } from '../../services/servicesAPI';
import {CREATE_REGISTER_PERSON , GET_DATA_PLACE, GET_REGISTER_PERSON} from '../types/registerPersonType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import { snackActions } from '../../helper/showSnackBar';

//get data register person 
export const getAllRegisterPersonAction = (dataRegisterPerson) => ({
    type: GET_REGISTER_PERSON,
    dataRegisterPerson
})
//Get data place
export const getVaccinationPlaceAction = (dataAllPlace) => ({
    type: GET_DATA_PLACE,
    dataAllPlace
})
//Create register person
export const addNewRegisterPerson = (dataRegisterPerson) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await registerServices.addNewRegisterPersonServices({
            "id_vaccine_place": dataRegisterPerson.id_place,
            "id_priority": dataRegisterPerson.id_priority,
            "is_sick": dataRegisterPerson.sick,
            "note": dataRegisterPerson.note,
            "number_of_times": dataRegisterPerson.numberInject
        })
        console.log(res)
        if(res.status === HTTP_200 && res.data.status){
            // snackActions.success("Đăng ký tiêm thành công 🎉");
            const reloadData = await registerServices.getAllDataRegisterPerson()
            console.log("reload Data: ",reloadData);
            // if(reloadData.status === HTTP_200 && reloadData.data.status){
            //     dispatch(getAllRegisterPersonAction(reloadData.data.data));
            //     console.log(reloadData);
            // }
            dispatch(closeLoadingAction())
            return true
        }else{
            dispatch(closeLoadingAction())
            return false
        }
    }catch(e){
        dispatch(closeLoadingAction())
        return false;
    }
}
//Get data place api
export const getAllDataPlace = () => async dispatch => {
    const res = await registerServices.getDataVaccinationPlace();
    if(res.status === HTTP_200 && res.data.status){
        dispatch(getVaccinationPlaceAction(res.data.data))
    }
    
}