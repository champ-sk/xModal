import { useState } from "react";

export default function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", dob: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    const { username, email, dob, phone } = formData;

    if (!username || !email || !dob || !phone) {
      alert("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (new Date(dob) > new Date()) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    setIsOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
  };

  return (
    <div className="modal flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Open Form
      </button>

      {isOpen && (
        <div className="modal-content fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Fill the Form</h2>
            <input id="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
            <input id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
            <input id="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
            <input id="phone" type="text" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
            <button onClick={handleSubmit} className="submit-button bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Submit
            </button>
            <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-600">X</button>
          </div>
        </div>
      )}
    </div>
  );
}