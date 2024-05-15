import React from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import logo from "../../imgs/ttech_icon.png";
import { BsPersonCircle } from "react-icons/bs";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { TbDatabaseImport } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";

import "./navbar.css";
import { HomePage } from "../../pages/HomePage";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const handleClickLogout = (e) => {
    sessionStorage.clear();
    navigate("/login", { state: { logged: false } });
  };
  console.log(sessionStorage.getItem('logged'));


  return (
    <>
      <header>
        <Link to="/">
          <img id="logo" src={logo} alt="Tech" width={250} height={40} />
        </Link>

        {

          sessionStorage.getItem('logged') ? (
            <nav>
              <span className="font-navbar username spanRow">
                <div className="spanCustom">
                  <BsPersonCircle /> {sessionStorage.getItem('username')}</div>

                <div className="spanCustom">
                  <TbDatabaseImport />
                  <NavLink className="navlink-padding" to="dashboard">Importar</NavLink>
                </div>

                <div className="spanCustom">
                  <BsFileEarmarkBarGraph />
                  <NavLink className="navlink-padding" to="reports">Reportes</NavLink>
                </div>

                <div className="spanCustom">
                  <FaRegEdit />
                  <NavLink className="navlink-padding" to="edit">Editar</NavLink>
                </div>

                <div className="spanCustom">
                  <FaWindowClose />
                  <a href="" onClick={handleClickLogout} className="navlink-padding">Salir</a>
                </div>
              </span>|

            </nav>
          ) : (
            <nav>
              <Link to="/register" className="font-navbar">
                Registrarse
              </Link>
            </nav>
          )}
      </header>

      <Outlet />
    </>
  );
};
