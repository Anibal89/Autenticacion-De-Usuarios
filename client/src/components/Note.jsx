import React, { memo, useContext, useState, useEffect } from "react";
import { userContext } from "./Home";

const Note = () => {
  const { noteUpdate } = useContext(userContext);
  const [listnotas, setListNotas] = useState([]);

  useEffect(() => {
    fetch("/api/getNotes")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setListNotas(data.message);
      });
  }, [noteUpdate]);

  console.log(listnotas);

  return (
    <>
      {listnotas == []
        ? console.log("No hay Notas")
        : listnotas.map((e) => (
            <div className="card mx-3 mt-3 " key={e.note_id} style={{ width: "17rem" }}>
              <div className="card-body">
                <h5 className="card-title">{e.title}</h5>
                <span
                  style={{ fontSize: "0.9rem" }}
                  className="card-subtitle mb-2 text-muted"
                >
                  {e.date}
                </span>
                <p className="card-text">{e.note}</p>
              </div>
            </div>
          ))}
    </>
  );
};

export default memo(Note);
