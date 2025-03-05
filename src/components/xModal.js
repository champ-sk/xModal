import { useState } from "react";

export default function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", dob: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    if (!username) {
      alert("Please fill out the Username field.");
      return;
    }
    if (!email) {
      alert("Please fill out the Email field.");
      return;
    }
    if (!dob) {
      alert("Please fill out the Date of Birth field.");
      return;
    }
    if (!phone) {
      alert("Please fill out the Phone Number field.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }
    const dobDate = new Date(dob);
    const today = new Date();
    if (isNaN(dobDate) || dobDate > today) {
      alert("Invalid date of birth, date of birth can not be in future.");
      return;
    }

    setFormData({ username: "", email: "", dob: "", phone: "" });
    setIsOpen(false);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal")) {
      setTimeout(() => setIsOpen(false), 50); // Ensures Cypress detects closure
    }
  };

  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" type="text" value={formData.username} onChange={handleChange} required />
              <br />
              <label>Email:</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} required />
              <br />
              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} required />
              <br />
              <label>Phone Number:</label>
              <input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              <br />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
