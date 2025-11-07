import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./page/Products.jsx";
import Cart from "./page/Cart.jsx";
import CheckoutHistory from "./page/CheckoutHistory";

export default function App() {
    return (
        <Router>
            <Navbar />
            <main className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/history" element={<CheckoutHistory />} />
                </Routes>
            </main>
        </Router>
    );
}
