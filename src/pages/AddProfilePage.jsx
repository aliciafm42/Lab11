import AddProfileForm from "../AddProfileForm.jsx";

function AddProfilePage() {
  const handleAddProfile = (profile) => {
    console.log("Profile submitted:", profile);
  };

  return (
    <div>
      <h1>Add Profile</h1>
      <AddProfileForm onAddProfile={handleAddProfile} />
    </div>
  );
}

export default AddProfilePage;
