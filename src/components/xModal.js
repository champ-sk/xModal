import { useState } from "react";

const XModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateDOB = (dob) => {
    const date = new Date(dob);
    const today = new Date();
    return !isNaN(date) && date < today;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!validateDOB(formData.dob)) {
      newErrors.dob = "Invalid date of birth";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted successfully", formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        <h2 className="text-xl font-semibold mb-4">Form Modal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-3">
            <label className="block font-medium">Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="mb-3">
            <label className="block font-medium">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default XModal;
