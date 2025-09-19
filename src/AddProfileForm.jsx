import { useState } from "react";

const AddProfileForm = ({ onAddProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    bio: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.title || !formData.bio) {
      setError("All fields except image are required.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    onAddProfile({ ...formData });
    setSuccess("Profile added successfully!");
    setFormData({ name: "", email: "", title: "", bio: "", image: "" });
  };

  return (
    <div className="add-profile-form">
      <h2>Add Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
        <input name="image" placeholder="Image URL (optional)" value={formData.image} onChange={handleChange} />
        <button type="submit">Add Profile</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default AddProfileForm;
