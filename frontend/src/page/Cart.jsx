import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import useUser from "../hooks/useUser";
import CartItem from "../components/CartItem";

export default function Cart() {
    const user = useUser();
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);

    // Fetch cart data
    const fetchCart = async () => {
        try {
            const { data } = await API.get(`/getAll/${encodeURIComponent(user)}`);
            if (data.items) {
                setCart({ items: data.items, totalPrice: data.totalPrice });
            } else {
                setCart({ items: [], totalPrice: 0 });
            }
        } catch (err) {
            console.error("Get Cart Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, action) => {
        try {
            const { data } = await API.post(`/updateQuantity/${encodeURIComponent(user)}/${itemId}/${action}`);
            setCart({ items: data.cart.items, totalPrice: data.cart.totalPrice });
        } catch (err) {
            console.error("Quantity Update Error:", err);
            alert("Failed to update quantity");
        }
    };

    // Remove item
    const handleRemove = async (itemId) => {
        try {
            await API.delete(`/removeItem/${encodeURIComponent(user)}/${itemId}/1`);
            fetchCart();
        } catch (err) {
            console.error("Remove Item Error:", err);
            alert("❌ Failed to remove item");
        }
    };

    // Checkout
    const handleCheckout = async () => {
        try {
            const { data } = await API.post(`/checkOut/${encodeURIComponent(user)}`);
            alert(
                `✅ Checkout successful!\nTotal: $${data.receipt.totalPrice}\nTime: ${new Date(
                    data.receipt.timestamp
                ).toLocaleString()}`
            );
            fetchCart(); // refresh (cart will be empty after checkout)
        } catch (err) {
            console.error("Checkout Error:", err);
            alert("❌ Checkout failed");
        }
    };

    useEffect(() => {
        if (user) fetchCart();
    }, [user]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-xl text-primary">
                Loading your cart...
            </div>
        );

    if (!cart.items.length)
        return (
            <div className="text-center py-20 text-gray-600 text-lg">
                🛍️ Your cart is empty. <br />
                <a href="/" className="text-primary underline">
                    Go shop some items!
                </a>
            </div>
        );

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
                🛒 Your Cart
            </h1>

            <div className="space-y-4">
                {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} onRemove={() => handleRemove(item.id)}  onUpdateQuantity={(action) => updateQuantity(item.id, action)} />
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center border-t pt-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Total: <span className="text-primary">${cart.totalPrice.toFixed(2)}</span>
                </h2>

                <button
                    onClick={handleCheckout}
                    className="bg-accent text-white px-5 py-2 rounded-md bg-green-600 hover:bg-green-800 transition cursor-pointer hover:shadow-lg hover:shadow-gray-600"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}
