import React, { useState } from "react";
import UserNameEntry from "./components/UserNameEntry";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [userNameEntered, setUserNameEntered] = useState(false);

  const handleUserNameSubmit = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
    setUserNameEntered(true);
  };

  return (
    <div className="App">
      {!userNameEntered && <UserNameEntry setUserName={handleUserNameSubmit} />}

      {userNameEntered && <Cards userName={userName} />}
    </div>
  );
}

export default App;
