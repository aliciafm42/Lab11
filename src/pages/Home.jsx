import { useState } from "react";
import Introduction from "../Introduction.jsx";
import Card from "../Card.jsx";
import Wrapper from "../Wrapper.jsx";
import FilterDropdown from "../FilterDropdown.jsx";
import SearchBox from "../SearchBox.jsx";
import ResetButton from "../ResetButton.jsx";
import AddProfileForm from "../AddProfileForm.jsx";

function Home() {
  const localProfiles = [
    {
      title: "Willow",
      description:
        "Willow trees are diverse, graceful, fast-growing deciduous trees or shrubs characterized by simple, typically narrow, serrated leaves, often on slender, flexible branches",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Salix_babylonica1.jpg/320px-Salix_babylonica1.jpg",
    },
    {
      title: "Evergreen",
      description:
        "In botany, an evergreen is a plant which has foliage that remains green and functional throughout the year.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Evergreen_forest_in_British_Columbia.jpg/320px-Evergreen_forest_in_British_Columbia.jpg",
    },
  ];

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState(localProfiles);

  const handleAddProfile = (newProfile) => {
    setProfiles((p) => [...p, newProfile]);
  };

  const handleReset = () => {
    setFilter("");
    setSearch("");
  };

  const filteredCards = profiles.filter((card) => {
    const matchesFilter = filter ? card.title === filter : true;
    const matchesSearch = card.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h1>Profile App</h1>
      <Introduction />

      <div className="controls">
        <FilterDropdown
          filter={filter}
          setFilter={setFilter}
          options={profiles.map((c) => c.title)}
        />
        <SearchBox search={search} setSearch={setSearch} />
        <ResetButton onReset={handleReset} />
      </div>

      <AddProfileForm onAddProfile={handleAddProfile} />

      <Wrapper>
        {filteredCards.map((card, index) => (
          <Card
            key={index}
            title={card.title || card.name}
            description={card.description || card.bio}
            image={card.image}
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default Home;
