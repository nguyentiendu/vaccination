import React from "react";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
//style
import RegisterStyle from "./RegisterStyle.module.scss"
import Image from "next/image"
//component MUI
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
//notify
import {snackActions} from '../../../../helper/showSnackBar';
//validate
import {validationInvalid} from '../../../../helper/validate/validation';
//date Picker
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//connect redux
import {connect} from "react-redux";
//push up data to redux
import {addNewRegisterPerson, getAllDataPlace} from '../../../../redux/actions/registerPersonAction'
import { border } from "@mui/system";

//data  priorities
export const dataPriorities = [
    {
        "id_priority":1,
        "name_priority": "Người làm việc trong cơ sở y tế"
    },
    {
        "id_priority":2,
        "name_priority": "Người tham gia phòng chống dịch"
    },
    {
        "id_priority":3,
        "name_priority": "Lực lượng quân đội"
    },
    {
        "id_priority":4,
        "name_priority": "Lực lượng công an"
    },
    {
        "id_priority":5,
        "name_priority": "Nhân viên cán bộ ngoại giao Việt Nam"
    },
    {
        "id_priority":6,
        "name_priority": "Cán bộ hải quan làm công tác xuất nhập cảnh"
    },
    {
        "id_priority":7,
        "name_priority": "Người cung cấp dịch vụ thiết yếu: hàng không, vận tải, ytees"
    },
    {
        "id_priority":8,
        "name_priority": "Giáo viên, học sinh, sinh viên"
    },
    {
        "id_priority":9,
        "name_priority": "Người mắc bệnh mãn tính, trên 65 tuổi"
    },
    {
        "id_priority":10,
        "name_priority": "Người sống tại vùng có dịch"
    },
    {
        "id_priority":11,
        "name_priority": "Người nghèo các đối tượng chính sách xã hội"
    },
    {
        "id_priority": 12,
        "name_priority": "Các đối tượng lao động tại các cơ sở doanh nghiệp"
    },
    {
        "id_priority": 13,
        "name_priority": "Các chức sắc chức việc tôn giáp"
    },
    {
        "id_priority": 14,
        "name_priority": "Người lao động tự do"
    },
    {
        "id_priority": 15,
        "name_priority": "Các đối tượng theo quyết định của bộ y tế"
    }
]

export const dataHealth = [
    {
        "is_sick": false,
        "name_sick": "Bình thường"
    },
    {
        "is_sick": true,
        "name_sick": "Ốm"
    }

]
const useStyles = makeStyles((theme) => ({
    input: {
        backgroundColor: "#FFCCCC",
        borderRadius: 4
    },
    button: {
        margin: "10px"
    }
  }));
function RegisterTable(props) {

    //user data
    const {userInfo} = props.userInfoFromRedux;

    //convert Timestamp --> Date time
    const dateTime = new Date(userInfo.dob);
    const convertTimeStampToDate = dateTime.getDate() + "/" + dateTime.getMonth() + 1 + "/" + dateTime.getFullYear();

    //vaccination place
    const {dataAllPlace} = props.dataPlaceFromRedux;

    //navigate back home
    const router = useRouter();
    const navigateHome = () => router.push("/");
    
    //reStyle Input
    const classes = useStyles();
    
    // Call api
    useEffect(() => {
        props.getAllDataPlace();
        console.log("run effect")
    }, [])


  //dữ liệu khởi tạo
  const [dataRegisterPerson, setDataRegisterPerson] = React.useState({
      value: {
        id_place: 1,
        id_priority: 15,
        sick: false,
        note: "",
        numberInject: 1,
          
      },
      error: {
        id_place: false,
        id_priority: false,
        note: false,
        numberInject: false
      }

  })

  //register submit
  const onClickRegisterPerson = async () => {
    if (dataRegisterPerson.error.note){
        snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại');
    } else {
        if (dataRegisterPerson.value.note.length === 0) {
            setDataRegisterPerson(state => ({
                value: state.value,
                error: {
                    note: validationInvalid(state.value.note),
                }
            }))
            snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại')
        } else {
            const result = await props.addNewRegisterPerson(dataRegisterPerson.value)
            // console.log(result);
            if (result) {
                snackActions.success('Đăng ký tiêm thành công 🎉')
                setDataRegisterPerson(state => ({
                    value: {
                        id_priority: 15,
                        sick: false,
                        note: "",
                        numberInject: 1,
                        id_place: 1
                    },
                    error: {
                        id_place: false,
                        id_priority: false,
                        sick: false,
                        note: false,
                        numberInject: false
                    }
                }))
            } else {
                snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại')
            }
        }
    }
}

const handleChangePriority = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, id_priority: event.target.value},
        error: {...state.error}
    }))
}
const handleChangeHealth = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, sick: event.target.value},
        error: {...state.error},
    }))
    
}
const handleChangeNote = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, note: event.target.value},
        error: {...state.error, note: validationInvalid(event.target.value)}
    }))
}

const handleChangeNumberInject = (event) => {
    setDataRegisterPerson(state => ({
        value: {...state.value, numberInject: event.target.value},
        error: {...state.error}
    }))
}
const handleChangePlace = (event) => {
    setDataRegisterPerson(state => ({
        value: {...state.value, id_place: event.target.value},
        error: {...state.error}
    }))
}
  return (

      <section className="sectionPage">
          <div className="xl:container mx-auto px-4">
              <div className="containerHeader">
                  <div className="h-auto shadow-2xl rounded bg-blue-100">
                      <h2 className="text-xl font-medium p-5">Thông tin cá nhân</h2>
                  </div>
              </div>
              <div className="row mt-20">
                <div className="font-medium mb-2">1. Thông tin người đăng ký tiêm</div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                    <div>
                         <p className="mb-2">Họ và tên</p>
                         <TextField 
                            className="h-8 min-w-full xl:w-full mb-2 " 
                            size="small"  id="outlined-disabled"  
                            color="warning" focused
                            variant="outlined" 
                            disabled
                            inputProps={{className: classes.input}}
                            defaultValue = {userInfo.fullName}
                            />
                    </div>
                    <div>
                        <p className="mb-2">Ngày Sinh</p>
                        <TextField 
                            className="h-8 min-w-full xl:w-full mb-2" 
                            size="small" id="outlined-disabled"  
                            variant="outlined" 
                            placeholder="Họ và tên"
                            disabled
                            inputProps={{className: classes.input}}
                            defaultValue = {convertTimeStampToDate}          
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
                            inputProps={{className: classes.input}}
                            defaultValue = {userInfo.gender}
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
                            inputProps={{className: classes.input}}
                            defaultValue = {userInfo.phoneNumber}
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
                            inputProps={{className: classes.input}}
                            defaultValue = {userInfo.identify}
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
                            inputProps={{className: classes.input}}
                            defaultValue = {userInfo.insurance}
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
                            inputProps={{className: classes.input}}
                            defaultValue = {userInfo.address}
                            />
                    </div>
                    <div className="col-span-2">
                        <p className="mb-2">Nhóm ưu tiên (<span className = {RegisterStyle.asterisk}>*</span>)</p>
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleChangePriority}
                            value={dataRegisterPerson.value.id_priority}
                            label="Nhóm ưu tiên"
                            >
                            {dataPriorities.map((item, index) => (
                                <MenuItem key={index} value={item.id_priority}>
                                    {item.name_priority}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-span-2">
                        <p className="mb-2">Tình trạng sức khỏe (<span className = {RegisterStyle.asterisk}>*</span>)</p>
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleChangeHealth}
                            value={dataRegisterPerson.value.sick}
                            label="Tình trạng sức khỏe"
                            >
                            {dataHealth.map((item, index) => (
                                <MenuItem key={index} value={item.is_sick}>
                                    {item.name_sick}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-span-4">
                        <p className="mb-2">Ghi chú (<span className = {RegisterStyle.asterisk}>*</span>)</p>
                         <TextField 
                            className=" min-w-full xl:w-full" 
                            required
                            size="small" id="outlined-basic" 
                            variant="outlined" 
                            placeholder="Ghi chú" 
                            onChange={handleChangeNote}/>
                    </div>
                    <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.note ? "Không được bỏ trống" : ""}</span>
                </div>
              </div>
              <div className="font-medium mt-2">2. Thông tin đăng ký tiêm chủng</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                    <div>
                         <p className="mb-2">Đăng ký mũi tiêm thứ (<span className = {RegisterStyle.asterisk}>*</span>)</p>
                        
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            type="number"
                            onChange={handleChangeNumberInject}
                            value={dataRegisterPerson.value.numberInject}
                            label="Đăng ký mũi tiêm"
                            >
                        </TextField>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.numberInject ? "Vui lòng chọn mũi tiêm" : ""}</span>
                    </div>
                    <div>
                        <p className="mb-2">Chọn điểm tiêm (<span className = {RegisterStyle.asterisk}>*</span>)</p>
                    
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleChangePlace}
                            value={dataRegisterPerson.value.id_place}
                            label="Chọn điểm tiêm"
                            >
                            {dataAllPlace.map((item,index) => (
                                <MenuItem key={index} value={item.id_vaccination_place}>
                                    {item.name_place}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
              </div>
              <div className="mt-2">
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Tôi đồng ý chịu trách nhiệm với các thông tin đã cung cấp" />
                </FormGroup>
              </div>
              <div className = "mt-2 flex justify-center ">
                <Button className={classes.button} variant="outlined" onClick={navigateHome} >Hủy bỏ</Button>
                <Button className={classes.button} variant="contained" onClick = {() => {onClickRegisterPerson()}}>Xác nhận</Button>
              </div>
          </div>
      </section>

  );
}
const mapStateToProps = (state) => ({
    dataPlaceFromRedux: state.registerPersonReducer,
    userInfoFromRedux: state.authReducer
});

const mapDispatchToProps = {
    addNewRegisterPerson,
    getAllDataPlace
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterTable);