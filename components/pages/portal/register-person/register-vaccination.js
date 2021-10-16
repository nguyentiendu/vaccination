import React from "react";
import RegisterStyle from "./RegisterStyle.module.scss"
import Image from "next/image"
import logoCovid from "../../../../public/icon-5.png"
import RegisterTable from "./register-table";
export default function RegisterVaccinePerson() {


  return (

      <div className="main">
          <nav className={RegisterStyle.navbar}>
            <div className = {RegisterStyle.navbarBrand}>
              <a className = {RegisterStyle.navbarBrandItem}>
                <Image src = {logoCovid} alt = "Picture" width={50} height={50}/>
              </a>
              <div className = {RegisterStyle.navbarStart}>
                <a className = {RegisterStyle.navbarItem}>
                  Cổng thông tin tiêm chủng
                </a>
              </div>
            </div>
            <div className = {RegisterStyle.navbarMenu}>
              
              <div className = {RegisterStyle.navbarEnd}> 
                <div className = {RegisterStyle.navbarItemEnd}>
                  <ul className = {RegisterStyle.navbarButton}>
                    <li><a>Trang chủ</a></li>
                    <li><a>Đăng kí tiêm</a></li>
                    <li><a>Tra cứu</a></li>
                    <li><a>Tài liệu</a></li>

                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div className = {RegisterStyle.mainTitle}>
            <div className = "xl:container mx-auto px-4">
              <h2 className = "flex items-center h-16 text-2xl font-medium">Đăng ký tiêm cá nhân</h2>
            </div>
          </div>

          <main className = {RegisterStyle.container}>
              <RegisterTable />
          </main>
      </div>

  );
}