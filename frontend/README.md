# 🎨 VibeCart Frontend

Modern React shopping cart application with responsive design and seamless user experience.

## 📋 Overview

React-based e-commerce frontend featuring product browsing, cart management, and checkout functionality with Tailwind CSS styling.

## 🛠️ Tech Stack

- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Styling framework
- **Axios** - HTTP client
- **Vite 7** - Build tool & dev server

## 🚀 Setup

### Installation

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
# App runs on http://localhost:5173
```

### Build for Production

```bash
npm run build
```

## ✨ Features

### 🛒 Product Catalog
- Grid layout with product cards
- FakeStore API integration
- Product detail modal
- Quick "Add to Cart" buttons

### 🛍️ Shopping Cart
- Real-time quantity updates (+/- buttons)
- Item removal
- Auto-calculated totals
- Empty cart state handling

### ✅ Checkout
- Mock checkout with receipt generation
- Receipt modal with timestamp and total
- Cart clearing after successful checkout

### 📜 Order History
- Chronological order listing
- Detailed invoice modal
- Product breakdown with quantities
- Total and date display

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CartItem.jsx       # Cart item component
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── ProductCard.jsx    # Product card
│   │   └── ProductModal.jsx   # Product details modal
│   ├── page/
│   │   ├── Products.jsx       # Home/Products page
│   │   ├── Cart.jsx           # Cart page
│   │   └── CheckoutHistory.jsx # Order history
│   ├── api/
│   │   └── axiosInstance.js   # API configuration
│   ├── hooks/
│   │   └── useUser.js         # User management hook
│   ├── App.jsx                # Root component
│   └── main.jsx               # Entry point
└── public/
```

## 🎯 Key Components

### Navbar
- Navigation links (Products, Cart, History)
- User display
- Switch user functionality

### ProductCard
**Props:** `{ product, onAdd, onView }`
- Product image & title
- Price display
- Add to cart button
- Click to view details

### CartItem
**Props:** `{ item, onRemove, onUpdateQuantity }`
- Item details with quantity
- +/- quantity controls
- Remove button
- Item total calculation

### ProductModal
**Props:** `{ product, onAdd, onClose }`
- Full product details
- Description
- Add to cart with auto-close

## 🔄 State Management

### Local State (useState)
```javascript
// Products page
const [products, setProducts] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);

// Cart page
const [cart, setCart] = useState({ items: [], totalPrice: 0 });

// History page
const [history, setHistory] = useState([]);
const [selectedBill, setSelectedBill] = useState(null);
```

### Persistent State (localStorage)
```javascript
// User identification
localStorage.setItem("cartUser", "user@example.com");
const user = localStorage.getItem("cartUser");
```

## 🌐 API Integration

### Axios Configuration
```javascript
// api/axiosInstance.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default API;
```

### Usage Example
```javascript
import API from "../api/axiosInstance";

// Add to cart
await API.post("/addCart", {
  user,
  id: product.id,
  name: product.title,
  price: product.price,
  quantity: 1,
});

// Get cart
const { data } = await API.get(`/getAll/${user}`);
```

### External API
```javascript
// FakeStore API for products
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => setProducts(data));
```

## 🎨 Styling with Tailwind

### Responsive Grid
```jsx
// Products grid - 1-4 columns based on screen size
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
```

### Custom Utilities
```jsx
// Primary button style
className="bg-blue-600 text-white px-5 py-2 rounded-md 
           hover:bg-blue-800 transition cursor-pointer 
           hover:shadow-lg"
```

### Modal with Backdrop
```jsx
className="fixed inset-0 bg-black/50 flex items-center 
           justify-center z-50 backdrop-blur-sm"
```

## 🎣 Custom Hooks

### useUser Hook
```javascript
// hooks/useUser.js
export default function useUser() {
  const [user, setUser] = useState("");
  
  useEffect(() => {
    const savedUser = localStorage.getItem("cartUser");
    if (savedUser) {
      setUser(savedUser);
    } else {
      const name = prompt("Enter your name or email:");
      localStorage.setItem("cartUser", name);
      setUser(name);
    }
  }, []);
  
  return user;
}
```

**Usage:**
```javascript
const user = useUser();
// Use user for API calls
```

## 🧪 User Flow

### First-Time User
```
1. Open app → Name prompt
2. Enter name → Stored in localStorage
3. Browse products
4. Add items to cart
5. Checkout
6. View receipt
7. Check order history
```

### Returning User
```
1. Open app → Auto-loaded from localStorage
2. Continue shopping
3. Cart persists from previous session
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 640px` - Single column
- **Tablet**: `640px - 1024px` - 2-3 columns
- **Desktop**: `> 1024px` - 4 columns

### Mobile Optimizations
- Touch-friendly buttons (min 44x44px)
- Stacked navigation
- Full-width cards
- Simplified layouts

## 🐛 Common Issues

**Products Not Loading:**
- Check FakeStore API: `https://fakestoreapi.com/products`
- Verify network in DevTools

**Cart Not Updating:**
- Ensure backend is running on port 8080
- Check `axiosInstance.js` baseURL
- Verify user in localStorage

**Checkout Fails:**
- Ensure cart has items
- Check backend API logs
- Verify network connection

## 🔧 Available Scripts

```json
{
  "dev": "vite",              // Start dev server
  "build": "vite build",      // Production build
  "lint": "eslint .",         // Run linter
  "preview": "vite preview"   // Preview build
}
```

## 📚 Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.5",
  "@tailwindcss/vite": "^4.1.17",
  "axios": "^1.13.2"
}
```

## 🎯 Assignment Features Completed

- [x] Products grid with "Add to Cart"
- [x] Cart view with items/quantity/total
- [x] Remove and update quantity buttons
- [x] Checkout form → receipt modal
- [x] Responsive design (mobile-first)
- [x] FakeStore API integration
- [x] Error handling with user feedback
- [x] Loading states

## 💡 Key Implementation Highlights

### Real-time Cart Updates
```javascript
const updateQuantity = async (itemId, action) => {
  const { data } = await API.post(
    `/updateQuantity/${user}/${itemId}/${action}`
  );
  setCart({ 
    items: data.cart.items, 
    totalPrice: data.cart.totalPrice 
  });
};
```

### Modal Management
```javascript
// Open modal
setSelectedProduct(product);

// Close on backdrop click
<div onClick={onClose} className="backdrop">
  <div onClick={e => e.stopPropagation()}>
    {/* Modal content */}
  </div>
</div>
```

### Error Handling
```javascript
try {
  await API.post("/addCart", data);
  alert("✅ Item added!");
} catch (err) {
  console.error(err);
  alert("❌ Failed to add item");
}
```

---

**Part of Vibe Commerce Internship Assignment**
