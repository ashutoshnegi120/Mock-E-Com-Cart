import mongoose, { Schema } from "mongoose";

const checkModel = new Schema(
    {
        user: { type: String, required: true },
        products: { type: Schema.Types.ObjectId, ref: "Cart" },
        totalPrice: Number,
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const CheckOut =
    mongoose.models.Checkout || mongoose.model("Checkout", checkModel);

export default CheckOut;
