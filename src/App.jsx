import { useState } from "react";
import "./App.css";
import Header from "./Header.jsx";
import Introduction from "./Introduction.jsx";
import Card from "./Card.jsx";
import Wrapper from "./Wrapper.jsx";
import FilterDropdown from "./FilterDropdown.jsx";
import SearchBox from "./SearchBox.jsx";
import ResetButton from "./ResetButton.jsx";

function App() {
  // Card data
  const cardData = [
    {
      title: "Willow",
      description:
        "Willow trees are diverse, graceful, fast-growing deciduous trees or shrubs characterized by simple, typically narrow, serrated leaves, often on slender, flexible branches",
    },
    {
      title: "Evergreen",
      description:
        "In botany, an evergreen is a plant which has foliage that remains green and functional throughout the year. This contrasts with deciduous plants, which lose their foliage completely during the winter or dry season.",
    },
  ];

  // State for filter + search
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  // State for light/dark mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode(!darkMode);

  // Filter + search logic
  const filteredCards = cardData.filter((card) => {
    const matchesFilter = filter ? card.title === filter : true;
    const matchesSearch = card.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Reset button handler
  const handleReset = () => {
    setFilter("");
    setSearch("");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Header toggleMode={toggleMode} />
      <h1>Profile App</h1>
      <Introduction />

      <div className="controls">
        <FilterDropdown
          filter={filter}
          setFilter={setFilter}
          options={cardData.map((c) => c.title)}
        />
        <SearchBox search={search} setSearch={setSearch} />
        <ResetButton onReset={handleReset} />
      </div>

      <Wrapper>
        {filteredCards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </Wrapper>
    </div>
  );
}

export default App;
