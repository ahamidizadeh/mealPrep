import express from "express";
const router = express.Router();
import { getOrderDetails } from "../controllers/orderControllers.js";

router.get("/orders/:orderId", getOrderDetails);

export { router };
