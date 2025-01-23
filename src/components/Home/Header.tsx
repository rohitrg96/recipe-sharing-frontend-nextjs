import { HeaderProps } from '@/types/recipes';

const Header: React.FC<HeaderProps> = ({
  filters,
  onFiltersChange,
  initialFilters,
  setFiltersState,
}) => {
  // Handle input changes by calling the onFiltersChange prop
  const handleInputChange = (key: string, value: string | number) => {
    onFiltersChange(key, value); // Call the onFiltersChange function passed as a prop
  };

  const clearFilters = () => {
    setFiltersState(initialFilters); // Call the onFiltersChange function passed as a prop
  };
  return (
    <header className="p-6 bg-white shadow-md">
      <div className="text-center my-10">
        <h2 className="text-4xl font-bold text-gray-800  mb-5">Recipes</h2>
        <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
          Explore thousands of mouthwatering recipes from every corner of the
          globe! 🍲
        </h3>
      </div>
      <div className="mt-4 flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search ingredients..."
          value={filters.ingredients}
          onChange={(e) => handleInputChange('ingredients', e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md"
        />

        {/* Min Rating */}
        <select
          value={filters.minRating}
          onChange={(e) =>
            handleInputChange('minRating', Number(e.target.value))
          }
          className="w-full md:w-1/6 px-4 py-2 border rounded-md"
        >
          <option value="">Min Rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>

        {/* Max Prep Time */}
        <input
          type="number"
          placeholder="Max Prep Time (mins)"
          value={filters.maxPreparationTime}
          onChange={(e) =>
            handleInputChange('maxPreparationTime', Number(e.target.value))
          }
          className="w-full md:w-1/6 px-4 py-2 border rounded-md"
        />

        {/* Search Button */}

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Clear Filters
        </button>
      </div>
    </header>
  );
};

export default Header;
