import React, { useState } from "react";

function UserNameEntry({ setUserName }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  return (
    <div className="username-entry">
      <h3 className="main-hed">Enter Your Name</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />{" "}
        <br />
        <button type="submit" className="button">
          Play
        </button>
      </form>
    </div>
  );
}

export default UserNameEntry;
