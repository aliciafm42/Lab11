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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    onAddProfile(formData);
    setSuccess("Profile added successfully!");
    setFormData({ name: "", email: "", title: "", bio: "", image: "" });
  };

  return (
    <div className="add-profile-form">
      <h2>Add Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit">Add Profile</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default AddProfileForm;
