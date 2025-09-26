import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Wrapper from "../Wrapper.jsx";
import Card from "../Card.jsx";
import FilterDropdown from "../FilterDropdown.jsx";
import SearchBox from "../SearchBox.jsx";
import ResetButton from "../ResetButton.jsx";

function FetchedProfilesPage() {
  const [titles, setTitles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => setTitles(Array.isArray(data) ? data : []))
      .catch(() => setTitles([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${encodeURIComponent(
        filter
      )}&name=${encodeURIComponent(search)}&page=1&limit=10`
    )
      .then((res) => res.json())
      .then((data) => setProfiles(Array.isArray(data) ? data : []))
      .catch(() => setProfiles([]))
      .finally(() => setLoading(false));
  }, [filter, search]);

  const handleReset = () => {
    setFilter("");
    setSearch("");
  };

  return (
    <section className="fetched-section">
      <h2>Fetched Profiles</h2>

      <div className="controls">
        <FilterDropdown filter={filter} setFilter={setFilter} options={titles} />
        <SearchBox search={search} setSearch={setSearch} />
        <ResetButton onReset={handleReset} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : profiles.length > 0 ? (
        <Wrapper>
          {profiles.map((p, idx) => (
            <Link key={idx} to={`profile/${p.id}`} style={{ textDecoration: "none" }}>
              <Card
                title={p.title || p.Name}
                description={p.bio || p.description}
                image={p.image}
              />
            </Link>
          ))}
        </Wrapper>
      ) : (
        <p>No profiles found.</p>
      )}

      {/* Nested route content */}
      <Outlet />
    </section>
  );
}

export default FetchedProfilesPage;
