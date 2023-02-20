import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

import logo from "./logo.svg";
import node from "./Nodelogo.svg";

import axios from 'axios';

const Nav = () => {
  const navegar = useNavigate();

  const [logged, status] = useState(false);
  const [user, Uuser] = useState("");


// Logeo de usuarios con axios

/* const URL_Logged = '/api/auth/isLogged';

  const getUser = async () => {
    const res = axios.get(URL_Logged);
    return res;
  };

useEffect(() => {
    getUser().then(res => {
     if(res.data.status)
     {
      status(true);
      Uuser(res.data.user);
     }
     else {
      status(false);
     }

    })
 }, []);
 */

//Logeo de usuarios con fetch
  useEffect(() => {
     fetch("/api/isLogged")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          status(true);
          Uuser(data.user);
        } else {
          status(false);
        }
      }); 
  }, []);


  // const URL_Logout = '/api/auth/logout';
  // const handleLogout = () =>{
  //   const res = axios.get(URL_Logout);
  //   return res;
  // }

 //.then((res) => res.text())
 //.then((data) => navegar("/login"))

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              width="50"
              height="50"
              className="App-logo"
              alt="logo"
            />
          </a>
          <a className="navbar-brand" href="/">
            <img src={node} width="50" height="50" alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>

              {logged ? (
                <>
                  {" "}
                  <li
                    className="nav-item d-flex"
                    style={{ marginLeft: "1120px", alignItems: "center" }}
                  >
                    <i
                      className="bi bi-person-circle"
                      style={{ color: "white", fontSize: "25px" }}
                    ></i>
                    <span className="nav-link text-white">{user}</span>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#"
                      onClick={() =>
                        fetch("/api/logout")
                          .then((res) => res.text())
                          .then((data) => navegar("/login"))
                      }
                      className="btn btn-danger btn-sm"
                    >
                      Cerrar sesion
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>
                      Registrarse
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Iniciar sesion
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
