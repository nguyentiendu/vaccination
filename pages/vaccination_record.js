import Landing from "../layouts/Landing";
import React from "react";
import VaccinationRecordForm from "../components/pages/vaccination_record/VaccinationRecordForm";
// import ProfileForm from "../components/pages/profile/ProfileForm";
// import ProfileCard from "../components/pages/profile/ProfileCard";

export default function VaccinationRecord() {
    return (
        <Landing>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4 my-24">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <VaccinationRecordForm/>
                    </div>
                </div>
            </div>
        </Landing>
    )
}