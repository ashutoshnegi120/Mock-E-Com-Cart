import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import useUser from "../hooks/useUser";

export default function CheckoutHistory() {
    const user = useUser();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBill, setSelectedBill] = useState(null); // for modal

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const {data} = await API.get(`/checkoutHistory/${encodeURIComponent(user)}`);
            setHistory(data?.data || []);
        } catch (err) {
            console.error("History Fetch Error:", err);
            alert("❌ Failed to fetch checkout history");
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchHistory();
    }, [user]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-xl text-primary">
                Loading history...
            </div>
        );

    if (!history.length)
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                🧾 No checkout history yet. <br/>
                <a href="/" className="text-primary underline">
                    Start shopping now!
                </a>
            </div>
        );

    // helper to normalize items array for rendering
    const getItemsFromEntry = (entry) => {
        // 1) If entry.products is already an array (older shape)
        if (Array.isArray(entry.products)) return entry.products;
        // 2) If entry.products is a populated Cart object with .items
        if (entry.products && Array.isArray(entry.products.items)) return entry.products.items;
        // 3) If backend used singular `product` (embedded array)
        if (Array.isArray(entry.product)) return entry.product;
        // 4) If backend used `products` as embedded array (rare)
        if (Array.isArray(entry.products)) return entry.products;
        // 5) fallback to empty array
        return [];
    };

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
                📜 Checkout History
            </h1>

            <div className="space-y-6">
                {history.map((entry) => {
                    const items = getItemsFromEntry(entry);

                    return (
                        <div
                            key={entry._id}
                            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition flex items-center justify-between"
                        >
                            {/* Left: Order Summary */}
                            <div className="space-y-3">
                                <div>
                <span className="block text-xs text-gray-400 uppercase tracking-wider">
                  Total
                </span>
                                    <span className="text-xl font-bold text-primary">
                  ₹{entry.totalPrice ?? entry.totalprice ?? entry.TotalPrice ?? 0}
                </span>
                                </div>

                                <div>
                <span className="block text-xs text-gray-400 uppercase tracking-wider">
                  Date
                </span>
                                    <span className="text-sm font-medium text-gray-700">
                  {new Date(entry.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                  })}
                </span>
                                </div>
                            </div>

                            {/* Right: View Bill button */}
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={() => setSelectedBill(entry)}
                                    className="text-sm px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition cursor-pointer shadow-sm hover:shadow-md"
                                >
                                    View Bill
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 🧾 BILL MODAL */}
            {selectedBill && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-[90%] md:w-[600px] p-6 relative animate-fadeIn">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedBill(null)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold text-primary mb-2 text-center">
                            🧾 Invoice
                        </h2>

                        <p className="text-center text-gray-500 mb-4">
                            {new Date(selectedBill.createdAt).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                            <br/>
                            <span className="font-semibold text-gray-700">
              User: {selectedBill.user}
            </span>
                        </p>

                        <div className="border-t border-b py-2 mb-4">
                            {getItemsFromEntry(selectedBill)?.length ? (
                                getItemsFromEntry(selectedBill).map((prod, i) => (
                                    <div
                                        key={`${prod.id ?? i}-${i}`}
                                        className="flex justify-between py-2 text-gray-700 text-sm border-b border-gray-100 last:border-none"
                                    >
                                        <span className="truncate">{prod.name}</span>
                                        <span>
                    {prod.quantity} × ₹{prod.price}
                  </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic text-center py-2">
                                    No product details available.
                                </p>
                            )}
                        </div>

                        <div className="text-right mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Total:{" "}
                                <span className="text-green-600 font-bold">
                ₹
                                    {selectedBill.totalPrice ??
                                        selectedBill.totalprice ??
                                        selectedBill.TotalPrice ??
                                        0}
              </span>
                            </h3>
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setSelectedBill(null)}
                                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}