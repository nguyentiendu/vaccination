import {useEffect, useState} from "react";
import React from 'react'
import {useRouter} from 'next/router';
import {connect} from "react-redux";
import {DataGrid} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {getDataVaccinationRecord} from "../../../redux/actions/recordAction"

const columns = [
    {field: 'id_vaccination_records_detail', headerName: 'ID', width: 100},
    {field: 'id_vaccine', headerName: 'Tên vacxin', width: 200},
    {field: 'id_vaccine_place', headerName: 'Điểm tiêm', width: 240},
    {field: 'injection_date', headerName: 'Ngày tiêm', width: 200},
    {
        field: 'blood_pressure', headerName: 'Huyết áp', width: 150, renderCell: (params) => {
            return <Chip color="success" label={params.row.blood_pressure + " mmHg"} variant="outlined"/>
        },
    },
    {
        field: 'level_response', headerName: 'Mức độ phản ứng', width: 220, renderCell: (params) => {
            return <Chip color="success" label={params.row.level_response} variant="outlined"/>
        },
    },
    {
        field: 'heart_rate', headerName: 'Nhịp tim', width: 180, renderCell: (params) => {
            return <Chip color="success" label={params.row.heart_rate + " lần/phút"} variant="outlined"/>
        },
    },
    {field: 'note', headerName: 'Ghi chú', width: 200},
    
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function VaccinationRecordForm(props) {

        // dữ liệu người dùng
    const {userInfo} = props.userInfo;
    const {dataVaccinationRecord} = props.dataVaccinationRecord;

    //chuyen timestamp sang date
    const dataVaccinationRecords = dataVaccinationRecord.map((item, index) =>{
        return {...item, injection_date: new Date(item.injection_date * 1000).toISOString().substring(0, 10),id: index }
    })
    
    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    //sort
    const [sortModel, setSortModel] = useState([
        {
            field: 'id_vaccination_records_detail',
            sort: 'asc',
        },
    ]);

    useEffect(() => {
        setRows(dataVaccinationRecords);
    }, [dataVaccinationRecord]);

    /// Call api
    useEffect(() => {
        props.getDataVaccinationRecord();
    }, [])

    const dataUser = () => {
        if(userInfo.fullName.length === 0 || 
            userInfo.gender.length === 0 ||
            userInfo.address.length === 0 ||
            userInfo.identify.length === 0 ||
            userInfo.insurance.length === 0 ||
            userInfo.phoneNumber.length === 0){
                return false;
            }
            return true;
    }
    return (
        <>
        <div>
            <div className="xl:container mx-auto px-4"> 
                <h1 className="text-3xl mx-auto text-center font-semibold uppercase" >Chứng nhận tiêm chủng Covid-19</h1>
            </div>
            {dataUser() ? 
                <div>
                    <section className="sectionPage my-12">
                        <div className="xl:container mx-auto px-4">
                            <div className="row">
                                <div className="font-medium mb-2">1. Thông tin người đăng ký tiêm</div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                                    <div>
                                        <p className="mb-2">Họ và tên</p>
                                        <TextField
                                            className="h-8 min-w-full xl:w-full mb-2 "
                                            size="small" id="outlined-disabled"
                                            color="warning" focused
                                            variant="outlined"
                                            disabled
                                            defaultValue={userInfo.fullName}
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2">Ngày Sinh</p>
                                        <TextField
                                            className="h-8 min-w-full xl:w-full mb-2 "
                                            size="small"
                                            id="date"
                                            label="Ngày Sinh"
                                            type="date"
                                            disabled
                                            defaultValue={new Date(userInfo.dob * 1000).toISOString().substring(0, 10)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2">Giới tính</p>
                                        <TextField
                                            size="small"
                                            className="min-w-full xl:w-full"
                                            id="outlined-select-currency"
                                            placeholder="Giới tính"
                                            disabled
                                            defaultValue={userInfo.gender === "male" ? "Nam" : "Nữ"}
                                        >
                                        </TextField>

                                    </div>
                                    <div>
                                        <p className="mb-2">Số điện thoại</p>
                                        <TextField
                                            className=" min-w-full xl:w-full"
                                            size="small" id="outlined-basic"
                                            variant="outlined"
                                            placeholder="Số điện thoại"
                                            disabled
                                            defaultValue={userInfo.phoneNumber}
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2">Số CMND/CCCD/HC</p>
                                        <TextField
                                            className="min-w-full xl:w-full"
                                            size="small" id="outlined-basic"
                                            variant="outlined"
                                            placeholder="Số CMND/CCCD/HC"
                                            disabled
                                            defaultValue={userInfo.identify}
                                        />
                                    </div>
                                    <div>
                                        <p className="mb-2">Số thẻ BHYT</p>
                                        <TextField
                                            className=" min-w-full xl:w-full"
                                            size="small" id="outlined-basic"
                                            variant="outlined"
                                            placeholder="Số thẻ BHYT"
                                            disabled
                                            defaultValue={userInfo.insurance}
                                        />

                                    </div>
                                    <div className="col-span-2">
                                        <p className="mb-2">Địa chỉ hiện tại</p>
                                        <TextField
                                            className=" min-w-full xl:w-full"
                                            size="small" id="outlined-basic"
                                            variant="outlined"
                                            placeholder="Địa chỉ hiện tại"
                                            disabled
                                            defaultValue={userInfo.address}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {dataVaccinationRecords.length !==0 ?
                        <section>
                        <div className="xl:container mx-auto px-4">
                            <div className="row">
                                <div>
                                    <div className="font-medium mb-2">2. Lịch sử tiêm chủng</div>
                                </div>
                                <div style={{height: 470}}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        sortModel={sortModel}
                                        onSortModelChange={(model) => setSortModel(model)}
                                        rowsPerPageOptions={[5, 10, 20, 30]}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    />
                                </div>
                            </div>
                        </div>
                    </section> : 
                        <div>
                            <h1 className="text-xl text-center font-semibold my-28 text-gray-400" >Bạn chưa có lịch sử tiêm chủng cá nhân</h1>
                        </div>
                    }
                </div> : 
                        <div>
                            <h1 className="text-xl text-center font-semibold my-28 text-gray-400" >Bạn chưa có hồ sơ tiêm chủng cá nhân</h1>    
                        </div>}
        </div>
        
    </>


    );
}
const mapStateToProps = (state) => ({
    userInfo: state.authReducer,
    dataVaccinationRecord: state.recordReducer
});
const mapDispatchToProps = {
    getDataVaccinationRecord
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationRecordForm);
