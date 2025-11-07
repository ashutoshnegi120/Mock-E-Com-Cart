import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import useUser from "../hooks/useUser";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const user = useUser();

    // Fetch products from FakeStore API
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Add to cart
    const handleAddToCart = async (product) => {
        try {
            await API.post("/addCart", {
                user,
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
            alert(`${product.title} added to cart!`);
        } catch (err) {
            console.error("Add to Cart Error:", err);
            alert("Failed to add to cart. Try again.");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-xl text-primary">
                Loading products...
            </div>
        );

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
                🛒 Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onAdd={() => handleAddToCart(p)}
                        onView={() => setSelectedProduct(p)}
                    />
                ))}
            </div>

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onAdd={() => handleAddToCart(selectedProduct)}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
