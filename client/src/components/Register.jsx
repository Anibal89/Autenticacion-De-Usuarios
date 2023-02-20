import React, { Fragment, useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./logologin.jpg";

const Register = () => {
  const navegar = useNavigate();
  const [datos, SetUser] = useState({
    user: "",
    pass: "",
  });

  // const [atype, updateType] = useState("danger");
  // const [message, umessage] = useState("");
  // const [alert, ualert] = useState({ display: "none" });

  // const sendMessage = (text, type = "danger", time = 5) => {
  //   updateType(type);
  //   umessage(text);
  //   ualert({ display: "block" });
  //   console.log(type);
  //   setTimeout(() => {
  //     ualert({ display: "none" });
  //     if (type == "success") {
  //       navegar("/login");
  //     }
  //   }, time * 1000);
  // };

  const handleData = ({ target }) => {
    SetUser({
      ...datos,
      [target.name]: target.value,
    });
  };


  //Metodo register con fecth

  const handleAddRegistro = async (e) => {
    e.preventDefault();
    if (datos.user.length < 3 || datos.pass.length < 3)
     /*  return sendMessage(
         "por favor complete los campos del formulario correctamente"
       ); */
      return toast.warn(
        "por favor complete los campos del formulario correctamente",
        {
          autoClose: 2000,
        }
      );

    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.info(data.message, { autoClose: 1500 });
          setTimeout(() => {
          navegar("/login");
          }, 5 * 1000);
        } else {
          toast.error(data.message, { autoClose: 2000 });
        }
      });
  };

//Metodo Register con axios

/* const UrlRegister = "/api/auth/register";

   const handleAddRegistro = async(e) => {

    e.preventDefault();
    if (datos.user.length === 0 || datos.pass.length === 0)
      return toast.warn(
        "por favor complete los campos del formulario correctamente",
        {
          autoClose: 2000,
        }
      );

       const res = await axios.post(UrlRegister, datos)
        if (res.data.status)  {
          toast.info(res.data.message, { autoClose: 1500 });
          setTimeout(() => {
          navegar("/login");
          }, 5 * 1000);
        }  else  {
          toast.error(res.data.message, { autoClose: 2000 });
        }
  }; */

  return (
    <Fragment>
      <ToastContainer />
      <Nav />
      <div className="container mt-5 card-body d-flex justify-content-center ">
        {/* <div className={`alert alert-${atype}`} style={alert} role="alert">
          {message}
        </div> */}
        <div className="row ">
          <div className="col-sm-5 text-black  align-self-center just">
            <div className="card" style={{ border: "none" }}>
              <div className="card-body">
                <form onSubmit={handleAddRegistro}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuarios
                    </label>
                    <input
                      type="text"
                      name="user"
                      className="form-control"
                      value={datos.user}
                      onChange={handleData}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="pass"
                      value={datos.pass}
                      onChange={handleData}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-7 px-0 d-none d-sm-block">
            <img
              src={logo}
              alt="Login image"
              className="w-100"
              style={{ objectFit: "cover", height: "600px", border: "none" }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
