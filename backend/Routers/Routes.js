import express from "express";
import {
    addToCart,
    checkOut,
    checkOutHistory,
    deleteCartItems,
    getAllCartsItems, updateCartQuantity
} from "../Controller/mainLogic.js";

const Router = express.Router();

Router.post('/api/addCart', addToCart);
Router.get('/api/getAll/:user', getAllCartsItems);
Router.delete('/api/removeItem/:user/:id/:quantity', deleteCartItems);
Router.post('/api/checkOut/:user', checkOut);
Router.get('/api/checkoutHistory/:user', checkOutHistory);
Router.post("/api/updateQuantity/:user/:id/:action", updateCartQuantity);

export default Router;
