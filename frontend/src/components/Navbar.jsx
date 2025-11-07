import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Navbar() {
    const user = useUser();

    const handleChangeUser = () => {
        localStorage.removeItem("cartUser");
        window.location.reload();
    };

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-semibold text-primary">🛍️ VibeCart</h1>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-primary transition">Products</Link>
                    <Link to="/cart" className="hover:text-primary transition">Cart</Link>
                    <Link to="/history" className="hover:text-primary transition">History</Link>
                    <button
                        onClick={handleChangeUser}
                        className="px-3 py-1 bg-accent text-white rounded-md hover:bg-green-600 transition"
                    >
                        Switch User
                    </button>
                </div>
            </div>

            <div className="bg-lightBg text-center py-1 text-sm text-gray-600">
                Logged in as <span className="font-medium text-primary">{user || "Guest"}</span>
            </div>
        </nav>
    );
}
