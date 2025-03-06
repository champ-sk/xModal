import { useState } from "react";
import { Modal, Box, Button, TextField, Backdrop } from "@mui/material";

export default function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", dob: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    if (!username || !email || !dob || !phone) {
      alert("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    if (isNaN(dobDate) || dobDate > today) {
      alert("Invalid date of birth. It cannot be in the future.");
      return;
    }

    setFormData({ username: "", email: "", dob: "", phone: "" });
    setIsOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      setIsOpen(false);
    }
  };

  return (
    <div className="modal">
      <Button variant="contained" onClick={() => setIsOpen(true)}>Open Form</Button>
      <Modal
        open={isOpen}
        onClose={handleClose} // Ensure modal closes on backdrop click
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
       
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              p: 4,
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField id="username" label="Username" fullWidth margin="normal" value={formData.username} onChange={handleChange} required />
              <TextField id="email" label="Email" fullWidth margin="normal" type="email" value={formData.email} onChange={handleChange} required />
              <TextField id="dob" label="Date of Birth" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} required />
              <TextField id="phone" label="Phone Number" fullWidth margin="normal" type="tel" value={formData.phone} onChange={handleChange} required />
              <Button type="submit" variant="contained" className="submit-button" fullWidth sx={{ mt: 2 }}>Submit</Button>
            </form>
          </Box>
       
      </Modal>
    </div>
  );
}
