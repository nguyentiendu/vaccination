import React from "react";
import RegisterStyle from "./RegisterStyle.module.scss"
import Image from "next/image"
import logoCovid from "../../../../public/icon-5.png"
import RegisterTable from "./RegistrationVaccinationForm";
import Landing from "../../../../layouts/Landing";
import LandingNavbar from "../../../common/Navbar/LandingNavbar";
import LandingFooter from "../../../common/Footer/LandingFooter";
export default function RegisterVaccinePerson() {


  return (

      <div className="main">
          <LandingNavbar />
            <main className = {RegisterStyle.container}>
                <RegisterTable />
            </main>
          {/* <LandingFooter/> */}
          
      </div>

  );
}