import { useNavigate } from "react-router-dom";
import AddProfileForm from "../AddProfileForm.jsx";

function AddProfilePage() {
  const navigate = useNavigate();

  const handleAddProfile = (newProfile) => {
    console.log("Profile added:", newProfile);
    navigate("/"); // redirect to homepage
  };

  return (
    <div>
      <h2>Add Profile</h2>
      <AddProfileForm onAddProfile={handleAddProfile} />
    </div>
  );
}

export default AddProfilePage;
