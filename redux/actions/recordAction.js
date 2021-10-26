import { GET_VACCINATION_RECORD} from "../types/recordType";
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {vaccinationRecordServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";

export const getVaccinationRecordActions = (dataVaccinationRecord) => ({
    type: GET_VACCINATION_RECORD,
    dataVaccinationRecord
});

export const getDataVaccinationRecord = () => async dispatch =>{
    dispatch(openLoadingAction())
    try {
        const res = await vaccinationRecordServices.getDataRecordServices()
        if(res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            let dataRecord = res.data.data
            console.log(dataRecord);
            dataRecord = dataRecord.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getVaccinationRecordActions(dataRecord));
        }
        else {
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu hồ sơ tiêm chủng thất bại')
        }
    }catch (e){
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu hồ sơ tiêm chủng thất bại')
    }
}