import React, { createContext, useState } from "react";
import CreateNote from "./createNote";
import Nav from "./Nav";
import ShowNotes from './Shownotes'

export const userContext = createContext();

const Home = () => {
  const [atype, updateType] = useState("dange");
  const [message, umessage] = useState("");
  const [alert, ualert] = useState({ display: "none" });
  
  const [noteUpdate, runNoteUpdate] = useState(0);
  
  return (
    <>
      <Nav />
      <div className="container">
        <userContext.Provider value={{updateType,umessage,ualert,runNoteUpdate,noteUpdate}}>
          <div className={`alert alert-${atype}`} style={alert} role="alert">
            {message}
          </div>
          <CreateNote />
          <ShowNotes/>
        </userContext.Provider>
      </div>
    </>
  );
};

export default Home;
