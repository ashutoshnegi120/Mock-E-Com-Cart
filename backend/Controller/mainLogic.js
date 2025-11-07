import Cart from "../Model/cartModel.js";
import CheckOut from "../Model/checkModel.js";


export async function addToCart(req, res) {
    try {
        const { user, id, name, price, quantity } = req.body;

        if (!user || !id || !name || !price) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        let cart = await Cart.findOne({ user, isCheckout: false });

        if (!cart) {
            const newCart = new Cart({
                user,
                items: [{ id : String(id), name, price, quantity: parseInt(quantity) || 1 }],
            });

            await newCart.save();
            return res.status(201).json({ message: "Item added to new cart" });
        }

        const existingItem = cart.items.find((item) =>String(item.id) === String(id));

        if (existingItem) {
            existingItem.quantity += parseInt(quantity) || 1;
        } else {
            cart.items.push({ id, name, price, quantity: parseInt(quantity) || 1 });
        }

        await cart.save();
        return res.status(200).json({ message: "Item added to existing cart" });
    } catch (err) {
        console.error("Add to Cart Error:", err);
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
}


export async function getAllCartsItems(req, res) {
    try {
        const user = decodeURIComponent(req.params.user);
        if (!user) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const cartData = await Cart.findOne({ user, isCheckout: false });
        if (!cartData) {
            return res.status(200).json({ message: "No item in cart", items: [] });
        }

        const totalPrice = cartData.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        return res.status(200).json({
            items: cartData.items,
            totalPrice,
            message: "Cart data retrieved successfully",
        });
    } catch (err) {
        console.error("Get Cart Error:", err);
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
}


export async function deleteCartItems(req, res) {
    try {
        const { user, id, quantity } = req.params;

        if (!user || !id) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const cart = await Cart.findOne({ user, isCheckout: false });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        const item = cart.items[itemIndex];
        const qtyToRemove = parseInt(quantity) || 1;

        if (item.quantity > qtyToRemove) {
            item.quantity -= qtyToRemove;
        } else {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        return res.status(200).json({ message: "Item updated successfully", cart });
    } catch (err) {
        console.error("Delete Cart Error:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
}


export async function checkOut(req, res) {
    try {
        const { user } = req.params;

        if (!user) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const cart = await Cart.findOne({ user, isCheckout: false });
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ error: "Cart not found or empty" });
        }

        const newCheckout = new CheckOut({
            user,
            products: cart._id,
            totalPrice : cart.TotalPrice,
        });

        await newCheckout.save();

        await Cart.updateOne(
            { user, isCheckout: false },
            { $set: { isCheckout: true } }
        );

        return res.status(201).json({
            message: "Checkout successful",
            receipt: {
                user,
                totalPrice : cart.TotalPrice,
                timestamp: newCheckout.createdAt,
            },
            cart: { items: [] },
        });
    } catch (err) {
        console.error("Checkout Error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
}

export async function checkOutHistory(req, res) {
    try {
        const user = decodeURIComponent(req.params.user);

        if (!user) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const history = await CheckOut.find({ user })
            .populate("products", "items totalPrice createdAt")
            .sort({ createdAt: -1 });

        if (!history.length) {
            return res.status(200).json({ message: "No checkout history", data: [] });
        }

        return res.status(200).json({
            message: "Checkout history retrieved successfully",
            data: history,
        });
    } catch (err) {
        console.error("Checkout History Error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
}

export async function updateCartQuantity(req, res) {
    try {
        const { user, id, action } = req.params;

        if (!user || !id || !["increase", "decrease"].includes(action)) {
            return res.status(400).json({ error: "Missing or invalid parameters" });
        }

        const cart = await Cart.findOne({ user, isCheckout: false });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const item = cart.items.find((item) => String(item.id) === String(id));
        if (!item) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        if (action === "increase") {
            item.quantity += 1;
        } else if (action === "decrease") {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Auto-remove item if quantity hits zero
                cart.items = cart.items.filter((i) => String(i.id) !== String(id));
            }
        }

        const newTotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        cart.TotalPrice = newTotal;

        await cart.save();

        return res.status(200).json({
            message: `Quantity ${action}d successfully`,
            cart: {
                items: cart.items,
                totalPrice: newTotal
            }
        });
    } catch (err) {
        console.error("Update Quantity Error:", err);
        res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
}


