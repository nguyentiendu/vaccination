import React from "react";

import LandingNavbar from "../components/common/Navbar/LandingNavbar.js";
import LandingFooter from "../components/common/Footer/LandingFooter.js";
import SCSS from "../components/common/Navbar/SCSSNavbar.module.scss";
import Button from "@mui/material/Button";
import Link from "next/link";
import router from "next/router";
import {connect} from "react-redux";
import { useRouter } from 'next/router';
function Landing(props) {
    const router = useRouter()
    const navigateInjection = () => router.push("/vaccine_place/portal/register_person")
    const navigateLogin = () => router.push("/login")
    //user data
    console.log(props.userInfoFromRedux);
    const userInfo = props.userInfoFromRedux.userInfo
    return (
        <>
            <LandingNavbar transparent/>
            <main>
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('http://baochinhphu.vn/Uploaded/tranducmanh/2021_07_21/Tiem.jpg')",
                        }}
                    >
                    </div>
                    <div className="container relative mx-auto my-36">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                {(userInfo.email) ?
                                    <Button variant="contained" className={SCSS.btnMain} onClick={navigateInjection}>
                                        <p>Đăng ký tiêm ngay </p>
                                        <i className="fas fa-chevron-right mb-0.5"/>
                                    </Button> : 
                                    <Button variant="contained" className={SCSS.btnMain} onClick={navigateLogin}>
                                        <p>Đăng ký tiêm ngay </p>
                                        <i className="fas fa-chevron-right mb-0.5"/>
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* {children} */}
            <LandingFooter/>
        </>
    );
}
const mapStateToProps = (state) => ({
    userInfoFromRedux: state.authReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);