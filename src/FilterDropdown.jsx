const FilterDropdown = ({ filter, setFilter, options }) => (
  <div className="filter-dropdown">
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
