import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (e) => {
    if (e.target.classList.contains("modal-backdrop") || e.target.classList.contains("close-button")) {
      setIsOpen(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const phoneNo = e.target.phoneNo.value.trim();
    const dob = e.target.dob.value.trim();

    if (phoneNo.length !== 10 || isNaN(phoneNo)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (!dob) {
      alert("Date of birth cannot be empty.");
    } else if (new Date(dob).getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      alert("Form submitted successfully!");
      e.target.reset();
      setIsOpen(false);
    }
  };

  return (
    <div className="App ">
      <h1>User Details Modal</h1>
   

      {isOpen && (
  <div className="modal modal-backdrop" onClick={closeHandler}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={submitHandler}>
        <h2>Fill Details</h2>

        <div className="input-group">
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" required />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNo">Phone Number:</label>
          <input type="tel" name="phoneNo" id="phone" pattern="[0-9]{10}" required />
        </div>

        <div className="input-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" name="dob" id="dob" required />
        </div>

        <button type="submit" className="submit-button">Submit</button>
        <button type="button" className="close-button" onClick={() => setIsOpen(false)}>
          Close
        </button>
      </form>
    </div>
  </div>
)}
   <button onClick={clickHandler}>Open Form</button>

    </div>
  );
}

export default App;
