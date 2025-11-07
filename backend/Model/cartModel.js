import mongoose, { Schema } from "mongoose";

const cartModel = new Schema(
    {
        user: { type: String, required: true },
        items: [
            {
                id: String,
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
        isCheckout: { type: Boolean, default: false },
        TotalPrice: { type: Number, default: 0 },
    },
    { timestamps: true }
);

cartModel.pre("save", function (next) {
    if (this.items && Array.isArray(this.items)) {
        this.TotalPrice = this.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    } else {
        this.TotalPrice = 0;
    }
    next();
});

const Cart =
    mongoose.models.Cart || mongoose.model("Cart", cartModel);

export default Cart;
