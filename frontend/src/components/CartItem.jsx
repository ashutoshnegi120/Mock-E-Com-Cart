/* eslint-disable react/prop-types */
export default function CartItem({ item, onRemove, onUpdateQuantity }) {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
            {/* Product Info */}
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} × {item.quantity}
                </span>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
                {/* Total for this item */}
                <p className="text-lg font-semibold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Quantity Control */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onUpdateQuantity("decrease")}
                        disabled={item.quantity <= 1} // prevent going below 1
                        className={`px-3 py-1 rounded ${
                            item.quantity <= 1
                                ? "bg-gray-300 cursor-not-allowed opacity-60"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        –
                    </button>

                    <span className="min-w-[24px] text-center font-medium">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => onUpdateQuantity("increase")}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                        +
                    </button>
                </div>

                {/* Remove Button */}
                <button
                    onClick={onRemove}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition cursor-pointer hover:shadow-lg hover:shadow-gray-600"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
