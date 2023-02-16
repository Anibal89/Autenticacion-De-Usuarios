import React from "react";
import Note from "./Note";

const ShowNotes = () => {
  return (
    <>
      <div className="card mt-5 mb-5 ">
        <div className="card-body">
          <h3>Lista de Notas</h3>
          <div className="d-flex" style={{flexWrap:'wrap'}}>
          <Note />
          </div>
        </div>
      </div>
    </>
  );
};
export default ShowNotes;
