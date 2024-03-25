import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import logo from "../../imgs/ttech_icon.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const handleClickLogout = (e) => {
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <header>
        <Link to="/">
          <img id="logo" src={logo} alt="Tech" width={250} height={40} />
        </Link>

        {state?.logged ? (
          <nav>
            <span className="font-navbar username">{state?.username}</span>
            <Button
              label="Cerrar sesión"
              className="font-navbar"
              link
              onClick={handleClickLogout}
            ></Button>
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
