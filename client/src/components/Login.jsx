import React, { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const navegar = useNavigate();

  const [datos, SetUser] = useState({
    user: "",
    pass: "",
  });

/*   const [atype, updateType] = useState("dange");
  const [message, umessage] = useState("");
  const [alert, ualert] = useState({ display: "none" });

  const sendMessage = (text, type = 'danger', time = 5) => {
    updateType(type);
    umessage(text);
    console.log(type)
    ualert({ display: 'block' });
    setTimeout(() => {
        ualert({display:'none'})
        if(type == 'success') {navegar('/')}
    }, time * 1000);
  }; */

  const handleData = ({ target }) => {
    SetUser({
      ...datos,
      [target.name]: target.value,
    });
  };

  // const URLPOST = "http://localhost:4000/api/desperdicio/loginpro";

  // const handleAddRegistro = async (e) => {
  //   e.preventDefault();
  //   if (datos.user.length < 3 || datos.pass.length < 3)
  //     return sendMessage(
  //       "por favor complete los campos del formulario correctamente"
  //     );
  //   const respuesta = await axios.post(URLPOST, datos)
  //       if (respuesta.data.status) {sendMessage(respuesta.data.message, "success");}
  //       else {sendMessage(respuesta.data.message)};
  //    console.log(respuesta)
  // };

  const handlelogin = (e) => {
    e.preventDefault();
    if (datos.user.length === 0 || datos.pass.length === 0)
      return toast.warn(
        "por favor complete los campos del formulario correctamente",
        {
          autoClose: 2000,
        }
      );
    fetch('/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datos),

    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status)  {
          toast.success(data.message, { autoClose: 1500 });
          setTimeout(() => {
          navegar("/");
          }, 5 * 1000);
        }
        else  {toast.error(data.message, { autoClose: 2000 });}
      });
  };

  return (
    <>
      <Nav />
      <ToastContainer />
      <div className="container mt-5" style={{width:'500px'}}>
       {/*  <div className={`alert alert-${atype}`} style={alert} role="alert">
          {message}
        </div> */}
        <div className="card">
          <div className="card-body">
          <form onSubmit={handlelogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario
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
              <button type="submit" className="btn btn-warning">
                Iniciar Sesion
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
