const FilterDropdown = ({ filter, setFilter, options = [] }) => {
  const normalized = Array.from(new Set(
    (options || [])
      .map((o) => (typeof o === "string" ? o : o && (o.title || o.name)))
      .filter(Boolean)
  ));

  return (
    <div className="filter-dropdown">
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        {normalized.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
