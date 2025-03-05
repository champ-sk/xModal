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

    if (!username) return alert("Please fill out the Username field.");
    if (!email) return alert("Please fill out the Email field.");
    if (!dob) return alert("Please fill out the Date of Birth field.");
    if (!phone) return alert("Please fill out the Phone Number field.");
    
    if (!email.includes("@")) return alert("Invalid email. Please check your email address.");
    if (!/^[0-9]{10}$/.test(phone)) return alert("Invalid phone number. Please enter a 10-digit phone number.");
    if (new Date(dob) > new Date()) return alert("Invalid date of birth, date of birth can not be in future.");
    
    setFormData({ username: "", email: "", dob: "", phone: "" });
    setIsOpen(false);
  };

  return (
    <div className="app">
      <button onClick={() => setIsOpen(true)}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" type="text" value={formData.username} onChange={handleChange} />
              <br />
              <label>Email:</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} />
              <br />
              <label>Date of Birth:</label>
              <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
              <br />
              <label>Phone Number:</label>
              <input id="phone" type="text" value={formData.phone} onChange={handleChange} />
              <br />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
