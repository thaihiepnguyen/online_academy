import express from 'express';
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.get('/byCat/:id', productController.findByCatId);
export default router;