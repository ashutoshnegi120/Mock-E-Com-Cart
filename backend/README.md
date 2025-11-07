# 🔧 VibeCart Backend API

Express.js REST API with MongoDB for the VibeCart shopping cart application.

## 📋 Overview

RESTful API handling cart operations, checkout processing, and order history with MongoDB persistence.

## 🛠️ Tech Stack

- **Express.js 5** - Web framework
- **MongoDB + Mongoose 8** - Database & ODM
- **CORS** - Cross-origin support
- **dotenv** - Environment configuration

## 🚀 Setup

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/vibecart
PORT=8080
```

### Run Server

```bash
npm run dev
# Server runs on http://localhost:8080
```

## 📊 Database Models

### Cart Schema
```javascript
{
  user: String,              // User identifier
  items: [{
    id: String,              // Product ID
    name: String,            // Product name
    price: Number,           // Product price
    quantity: Number         // Item quantity
  }],
  isCheckout: Boolean,       // Checkout status
  TotalPrice: Number,        // Auto-calculated
  timestamps: true
}
```

### Checkout Schema
```javascript
{
  user: String,                     // User identifier
  products: ObjectId (ref: Cart),   // Reference to cart
  totalPrice: Number,               // Order total
  createdAt: Date,                  // Order timestamp
  timestamps: true
}
```

## 🌐 API Endpoints

### 1. Add to Cart
```
POST /api/addCart
```

**Request Body:**
```json
{
  "user": "user@example.com",
  "id": "1",
  "name": "Product Name",
  "price": 29.99,
  "quantity": 1
}
```

**Response:**
```json
{
  "message": "Item added to cart"
}
```

---

### 2. Get Cart
```
GET /api/getAll/:user
```

**Response:**
```json
{
  "items": [
    {
      "id": "1",
      "name": "Product Name",
      "price": 29.99,
      "quantity": 2
    }
  ],
  "totalPrice": 59.98,
  "message": "Cart data retrieved successfully"
}
```

---

### 3. Update Quantity
```
POST /api/updateQuantity/:user/:id/:action
```

**Parameters:**
- `action`: `increase` or `decrease`

**Response:**
```json
{
  "message": "Quantity increased successfully",
  "cart": {
    "items": [...],
    "totalPrice": 89.97
  }
}
```

**Features:**
- Auto-removes item if quantity reaches 0
- Recalculates total automatically

---

### 4. Remove Item
```
DELETE /api/removeItem/:user/:id/:quantity
```

**Response:**
```json
{
  "message": "Item updated successfully",
  "cart": { ... }
}
```

---

### 5. Checkout
```
POST /api/checkOut/:user
```

**Response:**
```json
{
  "message": "Checkout successful",
  "receipt": {
    "user": "user@example.com",
    "totalPrice": 149.97,
    "timestamp": "2025-01-15T10:30:00.000Z"
  },
  "cart": { "items": [] }
}
```

**Behavior:**
- Creates order record
- Marks cart as checked out
- Returns empty cart for next session

---

### 6. Get Order History
```
GET /api/checkoutHistory/:user
```

**Response:**
```json
{
  "message": "Checkout history retrieved successfully",
  "data": [
    {
      "_id": "order_id",
      "user": "user@example.com",
      "products": {
        "items": [...]
      },
      "totalPrice": 59.98,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

## 🔑 Key Features

### Auto-Calculation
- Total price calculated via Mongoose pre-save hook
- No manual calculation needed

### Smart Quantity Management
- Prevents negative quantities
- Auto-removes items at quantity 0
- Handles increase/decrease operations

### Order History
- Populates full cart details
- Sorted by newest first
- Maintains product-level breakdown

## ⚠️ Error Responses

```json
// 400 - Bad Request
{
  "error": "Missing required parameters"
}

// 404 - Not Found
{
  "error": "Cart not found"
}

// 500 - Server Error
{
  "error": "Internal server error",
  "message": "Error details"
}
```

## 🧪 Testing with cURL

```bash
# Add to cart
curl -X POST http://localhost:8080/api/addCart \
  -H "Content-Type: application/json" \
  -d '{"user":"test@test.com","id":"1","name":"Test","price":19.99,"quantity":1}'

# Get cart
curl http://localhost:8080/api/getAll/test@test.com

# Checkout
curl -X POST http://localhost:8080/api/checkOut/test@test.com
```

## 📁 Project Structure

```
backend/
├── Controller/
│   └── mainLogic.js        # All route handlers
├── Model/
│   ├── cartModel.js        # Cart schema
│   └── checkModel.js       # Checkout schema
├── Database/
│   └── Connect.js          # MongoDB connection
├── Routers/
│   └── Routes.js           # API routes
├── .env                    # Environment variables
├── .gitignore
├── index.js                # Server entry point
└── package.json
```

## 🔒 CORS Configuration

```javascript
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));
```

## 🐛 Troubleshooting

**MongoDB Connection Failed:**
- Check if MongoDB is running: `mongod --version`
- Verify MONGO_URI in `.env`

**Port Already in Use:**
- Change PORT in `.env`
- Or kill process: `lsof -ti:8080 | xargs kill -9`

**CORS Errors:**
- Verify frontend URL in CORS config
- Check if backend is running

## 📚 Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.19.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

---

**Part of Vibe Commerce Internship Assignment**
