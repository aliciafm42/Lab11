const SearchBox = ({ search, setSearch }) => (
  <div className="search-box">
    <input
      type="text"
      placeholder="Search by name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
);

export default SearchBox;
