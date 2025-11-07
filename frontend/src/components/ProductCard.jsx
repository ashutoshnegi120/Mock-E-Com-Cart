/* eslint-disable react/prop-types */
export default function ProductCard({ product, onAdd, onView }) {
    return (
        <div
            onClick={onView}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
        >
            <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain p-4 bg-lightBg"
            />

            <div className="p-4 flex flex-col justify-between h-[220px]">
                <h2 className="text-md font-semibold text-gray-800 line-clamp-2 mb-2">
                    {product.title.length > 45
                        ? product.title.slice(0, 45) + "..."
                        : product.title}
                </h2>

                <p className="text-lg font-bold text-primary mb-4">${product.price}</p>

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevents opening modal
                        onAdd();
                    }}
                    className="bg-primary bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md transition cursor-pointer hover:shadow-lg hover:shadow-gray-600"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
