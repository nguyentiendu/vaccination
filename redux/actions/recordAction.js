import { GET_VACCINATION_RECORD} from "../types/recordType";

export const getVaccinationRecordActions = (dataVaccinationRecord) => ({
    type: GET_VACCINATION_RECORD,
    dataVaccinationRecord
});

