import React, { useState,useContext } from "react";

import { userContext } from "./Home";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNote = () => {
   
  const {updateType,umessage,ualert,runNoteUpdate} = useContext(userContext);

  const [notas, SetNotas] = useState({
    title: "",
    note: "",
  });

  const sendMessage = (text, type = 'danger', time = 5) => {
    updateType(type);
    umessage(text);
    console.log(type)
    ualert({ display: 'block' });
    setTimeout(() => {
        ualert({display:'none'})
        // if(type == 'success') {navegar('/')}
    }, time * 1000);
  };

  const handleNotas = ({ target }) => {
    SetNotas({
      ...notas,
      [target.name]: target.value,
    });
  };

  const handleAddNota = (e) => {
    e.preventDefault();
    if (notas.note.length === 0 || notas.title.length === 0)
      return toast.warn(
        "por favor complete el formulario de notas",
        {
          autoClose: 2000,
        }
      );
    fetch('/api/createnote', {
      body: JSON.stringify(notas),
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status)  {

          toast.success(data.message, { autoClose: 1500 }); 
          runNoteUpdate(prev => prev + 1);

          // toast.success(data.message, { autoClose: 1500 });
          // setTimeout(() => {
          // navegar("/");
          // }, 5 * 1000);
        }
        else  {
          toast.error(data.message, { autoClose: 2000 });
          // sendMessage(data.message);
        }
      }); 
  };



  return (
    <>
      <ToastContainer />
       <div className="card mt-5">
        <div className="card-body">
          <h3>Crear Nota</h3>
          <form onSubmit={handleAddNota}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Titulo
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={notas.title}
                onChange={handleNotas}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="note" className="form-label">
                Nota
              </label>
              <textarea
                className="form-control"
                name="note"
                rows="3"
                value={notas.note}
                onChange={handleNotas}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-dark">
              Crear Nota
            </button>
          </form>
        </div>
      </div></>
   
  );
};

export default CreateNote;
