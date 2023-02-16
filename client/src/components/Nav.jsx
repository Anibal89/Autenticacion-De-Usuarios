import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './App.css'


import logo from './logo.svg';
import node from './Nodelogo.svg';

const Nav = () => {
  const navegar = useNavigate();

  const [logged, status] = useState(false);
  const [user, Uuser] = useState("");

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
            <img
              src={node}
              width="50"
              height="50"
              alt="logo"
            />
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
