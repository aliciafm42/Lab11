import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header.jsx";
import Introduction from "./Introduction.jsx";
import Card from "./Card.jsx";
import Wrapper from "./Wrapper.jsx";
import FilterDropdown from "./FilterDropdown.jsx";
import SearchBox from "./SearchBox.jsx";
import ResetButton from "./ResetButton.jsx";
import AddProfileForm from "./AddProfileForm.jsx";

function App() {
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
  const [darkMode, setDarkMode] = useState(false);
  const [profiles, setProfiles] = useState(localProfiles);

  const [titles, setTitles] = useState([]);
  const [fetchedProfiles, setFetchedProfiles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const toggleMode = () => setDarkMode((d) => !d);

  const handleAddProfile = (newProfile) => {
    setProfiles((p) => [...p, newProfile]);
  };

  const handleReset = () => {
    setFilter("");
    setSearch("");
  };

  useEffect(() => {
    const controller = new AbortController();
    async function loadTitles() {
      try {
        const res = await fetch(
          "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to load titles");
        const data = await res.json();
        setTitles(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setTitles([]);
        }
      }
    }
    loadTitles();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadProfiles() {
      setFetching(true);
      setFetchError("");
      try {
        const url = `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(
          filter
        )}&name=${encodeURIComponent(search)}&page=1&limit=10`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        setFetchedProfiles(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching profiles:", err);
          setFetchError("Could not load profiles. Check network/console.");
          setFetchedProfiles([]);
        }
      } finally {
        setFetching(false);
      }
    }
    loadProfiles();
    return () => controller.abort();
  }, [filter, search]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Header toggleMode={toggleMode} />
      <h1>Profile App</h1>
      <Introduction />

      <div className="controls">
        <FilterDropdown
          filter={filter}
          setFilter={setFilter}
          options={profiles.map((c) => c.title || c.name)}
        />
        <SearchBox search={search} setSearch={setSearch} />
        <ResetButton onReset={handleReset} />
      </div>

      <AddProfileForm onAddProfile={handleAddProfile} />

      <Wrapper>
        {profiles.map((card, index) => (
          <Card
            key={`local-${index}`}
            title={card.title || card.name}
            description={card.description || card.bio}
            image={card.image}
          />
        ))}
      </Wrapper>

      <section className="fetched-section">
        <h2>Fetched Profiles</h2>

        <div className="controls">
          <FilterDropdown filter={filter} setFilter={setFilter} options={titles} />
          <SearchBox search={search} setSearch={setSearch} />
          <ResetButton onReset={handleReset} />
        </div>

        {fetchError && <div className="error-message">{fetchError}</div>}

        <Wrapper>
          {fetching ? (
            <p>Loading...</p>
          ) : fetchedProfiles.length > 0 ? (
            fetchedProfiles.map((card, index) => (
              <Card
                key={`fetched-${index}`}
                title={card.title || card.Name || card.name}
                description={card.bio || card.description || ""}
                image={card.image}
              />
            ))
          ) : (
            <p>No profiles found.</p>
          )}
        </Wrapper>
      </section>
    </div>
  );
}

export default App;
