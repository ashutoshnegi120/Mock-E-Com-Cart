/* eslint-disable react/prop-types */
export default function ProductModal({ product, onAdd, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl relative p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    ×
                </button>

                {/* Product Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 object-contain"
                    />
                </div>

                {/* Product Details */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                    {product.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 text-center">
                    {product.description}
                </p>

                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-primary">${product.price}</p>
                    <button
                        onClick={() => {
                            onAdd();
                            onClose();
                        }}
                        className="bg-primary bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition cursor-pointer hover:shadow-lg hover:shadow-gray-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
