export default function SortBar({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "rating", label: "Rating" },
    { value: "year", label: "Year" },
    { value: "title", label: "Title" },
  ];
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
