import express from "express";
import ProductController from "../controllers/Product.js"

const router = express.Router();

router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProductById);
router.post("/products", ProductController.addProduct);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);
router.post("/products/payment", ProductController.recordPayment);

export default router;
