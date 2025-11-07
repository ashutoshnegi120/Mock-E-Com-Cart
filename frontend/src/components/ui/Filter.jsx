/* eslint-disable react/prop-types */
const Filter = ({ categories, selected, onChange }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <label className="font-medium text-gray-700">Filter:</label>
            <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="all">All</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
