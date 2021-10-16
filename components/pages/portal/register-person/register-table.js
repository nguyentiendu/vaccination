import React from "react";
import {useEffect, useState} from "react";
//style
import RegisterStyle from "./RegisterStyle.module.scss"
import Image from "next/image"
//component MUI
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
//notify
import {snackActions} from '../../../../helper/showSnackBar';
//validate
import {validationInvalid} from "../../../../helper/validate/validation";
//date Picker
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//connect redux
import {connect} from "react-redux";
//push up data to redux
import {addNewRegisterPerson, getAllDataPlace} from '../../../../redux/actions/registerPersonAction'


function RegisterTable(props) {

    const {dataAllPlace} = props.dataPlaceFromRedux;
    console.log(dataAllPlace);
    console.log(props.dataPlaceFromRedux);
    /// Call api
    useEffect(() => {
        props.getAllDataPlace();
        console.log("run effect")
    }, [])
  //select gender
  const genders = [
      {
          id: 1,
          value:"Nam"
      },
      {
          id: 2,
          value:"Nữ"
      }
  ]
  // select priority
  const priorities = [
      {
          id:1,
          name: "Nhóm ưu tiên 1"
      },
      {
          id:2,
          name: "Nhóm ưu tiên 2"
      }
  ]
  //select health
  const health = [
      {
          id: 1,
          name: "Bình thường"
      },
      {
          id: 2,
          name: "Không bình thường"
      }
  ]
  //select injection
  const injections = [
      {
          id: 1,
          value: "Mũi tiêm thứ nhất"
      },
      {
          id:2,
          value: "Mũi tiêm tiếp theo"
      }
  ]
  //select vaccination place
  const vaccinationPlaces = [
      {
          id:1,
          name: "Bệnh viện Đa khoa Medlatec"
      },
      {
          id:2,
          name: "Trạm y tế Phường Phúc Xá"
      }
  ]
//   const [gender, setGender] = React.useState('');
//   const [valueDate, setValueDate] = React.useState(null);
//   const [inject, setInject] = React.useState('');
//   const [vaccinationPlace, setVaccinationPlace] = React.useState('');
//   const handleChangeGender = (event) => {
//     setGender(event.target.value);
//   }
//   const handleChangeInject = (event) =>{
//     setInject(event.target.value);
//   }
//   const handleChangeVaccinationPlace = (event) =>{
//     setVaccinationPlace(event.target.value);
//   }

  //dữ liệu khởi tạo
  const [dataRegisterPerson, setDataRegisterPerson] = React.useState({
      value: {
          name: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
          identify: "",
          insurance: "",
          address: "",
          priority: "",
          sick: "",
          note: "",
          numberInject: "",
          place: ""
      },
      error: {
        name: false,
        dateOfBirth: false,
        gender: false,
        phone: false,
        identify: false,
        insurance: false,
        address: false,
        priority: false,
        sick: false,
        note: false,
        numberInject: false,
        place: false
      }

  })

  //register submit
  const onClickRegisterPerson = async () => {
    if (dataRegisterPerson.error.name ||
        dataRegisterPerson.error.dateOfBirth ||
        dataRegisterPerson.error.gender ||
        dataRegisterPerson.error.phone ||
        dataRegisterPerson.error.identify ||
        // dataRegisterPerson.error.insurance ||
        dataRegisterPerson.error.address ||
        dataRegisterPerson.error.priority ||
        dataRegisterPerson.error.sick ||
        // dataRegisterPerson.error.note ||
        dataRegisterPerson.error.numberInject ||
        dataRegisterPerson.error.place) {
        snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại')
    } else {
        if (dataRegisterPerson.value.name.length === 0 ||
            dataRegisterPerson.value.dateOfBirth.length === 0 ||
            dataRegisterPerson.value.gender.length === 0 ||
            dataRegisterPerson.value.phone.length === 0 ||
            dataRegisterPerson.value.identify.length === 0 ||
            // dataRegisterPerson.value.insurance.length === 0 ||
            dataRegisterPerson.value.address.length === 0 ||
            dataRegisterPerson.value.priority.length === 0 ||
            dataRegisterPerson.value.sick.length === 0 ||
            // dataRegisterPerson.value.note.length === 0 ||
            dataRegisterPerson.value.numberInject.length === 0 ||
            dataRegisterPerson.value.place.length === 0
            ) {
            setDataRegisterPerson(state => ({
                value: state.value,
                error: {
                    name: validationInvalid(state.value.name),
                    dateOfBirth: validationInvalid(state.value.dateOfBirth),
                    gender: validationInvalid(state.value.gender),
                    phone: validationInvalid(state.value.phone),
                    identify: validationInvalid(state.value.identify),
                    // insurance: validationInvalid(state.value.insurance),
                    address: validationInvalid(state.value.address),
                    priority: validationInvalid(state.value.priority),
                    sick: validationInvalid(state.value.sick),
                    // note: validationInvalid(state.value.note),
                    numberInject: validationInvalid(state.value.numberInject),
                    place: validationInvalid(state.value.place),
                }
            }))
            snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại')
        } else {
            const result = await props.addNewRegisterPerson(dataRegisterPerson.value)
            if (result) {
                snackActions.success('Đăng ký tiêm thành công 🎉')
                setDataRegisterPerson(state => ({
                    value: {
                        name: "",
                        dateOfBirth: "",
                        gender: "",
                        phone: "",
                        identify: "",
                        insurance: "",
                        address: "",
                        priority: "",
                        sick: "",
                        note: "",
                        numberInject: "",
                        place: ""
                    },
                    error: {
                        name: false,
                        dateOfBirth: false,
                        gender: false,
                        phone: false,
                        identify: false,
                        insurance: false,
                        address: false,
                        priority: false,
                        sick: false,
                        note: false,
                        numberInject: false,
                        place: false
                    }
                }))
            } else {
                snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại')
            }
        }
    }
}
// Handle validate
const handleNameValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, name: event.target.value},
        error: {...state.error, name: validationInvalid(event.target.value)}
    }))
}
const handleBirthValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, dateOfBirth: event},
        error: {...state.error, dateOfBirth: validationInvalid(event)}
    }))
}
const handleGenderValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, gender: event.target.value},
        error: {...state.error, gender: validationInvalid(event.target.value)}
    }))
}
const handlePhoneValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, phone: event.target.value},
        error: {...state.error, phone: validationInvalid(event.target.value)}
    }))
}
const handleIdentifyValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, identify: event.target.value},
        error: {...state.error, identify: validationInvalid(event.target.value)}
    }))
}
const handleInsuranceValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, insurance: event.target.value},
        error: {...state.error, insurance: validationInvalid(event.target.value)}
    }))
}

const handleAddressValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, address: event.target.value},
        error: {...state.error, address: validationInvalid(event.target.value)}
    }))
}
const handlePriorityValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, priority: event.target.value},
        error: {...state.error, priority: validationInvalid(event.target.value)}
    }))
}
const handleHealthValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, sick: event.target.value},
        error: {...state.error, sick: validationInvalid(event.target.value)}
    }))
}
const handleNoteValidate = (event) =>{
    setDataRegisterPerson(state => ({
        value: {...state.value, note: event.target.value},
        error: {...state.error, note: validationInvalid(event.target.value)}
    }))
}

const handleNumberInjectValidate = (event) => {
    setDataRegisterPerson(state => ({
        value: {...state.value, numberInject: event.target.value},
        error: {...state.error, numberInject: validationInvalid(event.target.value)}
    }))
}
const handlePlaceValidate = (event) => {
    setDataRegisterPerson(state => ({
        value: {...state.value, place: event.target.value},
        error: {...state.error, place: validationInvalid(event.target.value)}
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
                            className="h-8 min-w-full xl:w-full mb-2" 
                            size="small" id="outlined-basic"  
                            variant="outlined" 
                            placeholder="Họ và tên"
                            onChange={handleNameValidate}
                            />
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.name ? "Họ tên không được bỏ trống" : ""}</span>
                    </div>
                    <div>
                        <p className="mb-2">Ngày Sinh</p>
                         <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Chọn ngày sinh"
                                value={dataRegisterPerson.value.dateOfBirth}
                                onChange={handleBirthValidate}
                                // onChange={(newValue) => {
                                // setValueDate(newValue);
                                // }}
                                renderInput={(params) => <TextField {...params} 
                                                            size="small" 
                                                            className="min-w-full xl:w-full"
                                                            />}
                            />
                        </LocalizationProvider>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.dateOfBirth ? "Ngày sinh không được bỏ trống" : ""}</span>
                    </div>
                    <div>
                         <p className="mb-2">Giới tính</p>
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleGenderValidate}
                            value={dataRegisterPerson.value.gender}
                            label="Chọn giới tính"
                            >
                            {genders.map((option) => (
                                <MenuItem key={option.id} value={option.value}>
                                {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.gender ? "Vui lòng chọn giới tính" : ""}</span>
                    </div>
                    <div>
                        <p className="mb-2">Số điện thoại</p>
                         <TextField 
                            className=" min-w-full xl:w-full" 
                            size="small" id="outlined-basic"  
                            variant="outlined" 
                            placeholder="Số điện thoại"
                            onChange={handlePhoneValidate}/>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.phone ? "Số điện thoại không được bỏ trống" : ""}</span>
                    </div>
                    <div>
                        <p className="mb-2">Số CMND/CCCD/HC</p>
                         <TextField 
                            className="min-w-full xl:w-full" 
                            size="small" id="outlined-basic"  
                            variant="outlined" 
                            placeholder="Số CMND/CCCD/HC"
                            onChange={handleIdentifyValidate}/>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.identify ? "Số CMND/CCCD/HC không được bỏ trống" : ""}</span>
                    </div>
                    <div>
                        <p className="mb-2">Số thẻ BHYT</p>
                         <TextField 
                            className=" min-w-full xl:w-full" 
                            size="small" id="outlined-basic"  
                            variant="outlined" 
                            placeholder="Số thẻ BHYT"
                            onChange={handleInsuranceValidate}/>

                    </div>
                    <div className="col-span-2">
                        <p className="mb-2">Địa chỉ hiện tại</p>
                         <TextField 
                            className=" min-w-full xl:w-full" 
                            size="small" id="outlined-basic" 
                            variant="outlined" 
                            placeholder="Địa chỉ hiện tại"
                            onChange={handleAddressValidate} />
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.identify ? "Địa chỉ không được bỏ trống" : ""}</span>
                    </div>
                    <div className="col-span-2">
                        <p className="mb-2">Nhóm ưu tiên</p>
                         {/* <TextField className=" min-w-full xl:w-full" size="small" id="outlined-basic" variant="outlined" placeholder="Nhóm ưu tiên" /> */}
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handlePriorityValidate}
                            value={dataRegisterPerson.value.priority}
                            label="Nhóm ưu tiên"
                            >
                            {priorities.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.priority? "Chọn nhóm ưu tiên" : ""}</span>
                    </div>
                    <div className="col-span-2">
                        <p className="mb-2">Tình trạng sức khỏe</p>
                         {/* <TextField className=" min-w-full xl:w-full" size="small" id="outlined-basic" variant="outlined" placeholder="Tình trạng sức khỏe" /> */}
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleHealthValidate}
                            value={dataRegisterPerson.value.sick}
                            label="Tình trạng sức khỏe"
                            >
                            {health.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.sick ? "Chọn tình trạng sức khỏe" : ""}</span>
                    </div>
                    <div className="col-span-4">
                        <p className="mb-2">Ghi chú</p>
                         <TextField 
                            className=" min-w-full xl:w-full" 
                            size="small" id="outlined-basic" 
                            variant="outlined" 
                            placeholder="Ghi chú" 
                            onChange={handleNoteValidate}/>

                    </div>
                </div>
              </div>
              <div className="font-medium mt-2">2. Thông tin đăng ký tiêm chủng</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                    <div>
                         <p className="mb-2">Đăng ký mũi tiêm thứ</p>
                        
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleNumberInjectValidate}
                            value={dataRegisterPerson.value.numberInject}
                            label="Đăng ký mũi tiêm"
                            >
                            {injections.map((option) => (
                                <MenuItem key={option.id} value={option.value}>
                                {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.numberInject ? "Vui lòng chọn mũi tiêm" : ""}</span>
                    </div>
                    <div>
                        <p className="mb-2">Chọn điểm tiêm</p>
                    
                         <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handlePlaceValidate}
                            value={dataRegisterPerson.value.place}
                            label="Chọn điểm tiêm"
                            >
                            {dataAllPlace.map((option) => (
                                <MenuItem key={option.id_vaccination_place} value={option.name_place}>
                                {option.name_place}
                                </MenuItem>
                            ))}
                        </TextField>
                        <span
                            className="text-red-500 text-sm">{dataRegisterPerson.error.place ? "Vui lòng chọn điểm tiêm" : ""}</span>
                    </div>
              </div>
              <div className = "mt-2">
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Tôi đồng ý chịu trách nhiệm với các thông tin đã cung cấp" />
                </FormGroup>
              </div>
              <div className = "mt-2 flex justify-center ">
                <Button className="m-2" variant="outlined">Hủy bỏ</Button>
                <Button className="m-2" variant="contained" onClick = {() => {onClickRegisterPerson()}}>Xác nhận</Button>
              </div>
          </div>
      </section>

  );
}
const mapStateToProps = (state) => ({
    dataPlaceFromRedux: state.registerPersonReducer
});

const mapDispatchToProps = {
    addNewRegisterPerson,
    getAllDataPlace
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterTable);