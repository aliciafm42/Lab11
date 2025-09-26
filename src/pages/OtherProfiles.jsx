import { useState, useEffect } from "react";
import Card from "../Card.jsx";
import Wrapper from "../Wrapper.jsx";
import FilterDropdown from "../FilterDropdown.jsx";
import SearchBox from "../SearchBox.jsx";
import ResetButton from "../ResetButton.jsx";

function OtherProfiles() {
  const [titles, setTitles] = useState([]);
  const [fetchedProfiles, setFetchedProfiles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadTitles() {
      try {
        const res = await fetch(
          "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
          { signal: controller.signal }
        );
        const data = await res.json();
        setTitles(Array.isArray(data) ? data : []);
      } catch {
        setTitles([]);
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
        const data = await res.json();
        setFetchedProfiles(Array.isArray(data) ? data : []);
      } catch {
        setFetchError("Could not load profiles.");
        setFetchedProfiles([]);
      } finally {
        setFetching(false);
      }
    }
    loadProfiles();
    return () => controller.abort();
  }, [filter, search]);

  const handleReset = () => {
    setFilter("");
    setSearch("");
  };

  return (
    <div>
      <h1>Other Profiles</h1>

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
              key={index}
              title={card.title || card.Name || card.name}
              description={card.bio || card.description || ""}
              image={card.image}
            />
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </Wrapper>
    </div>
  );
}

export default OtherProfiles;
