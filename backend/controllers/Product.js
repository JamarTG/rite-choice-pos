import Product from "../schemas/product.js";
import { v4 as uuidv4 } from 'uuid';

class ProductController {
  static async getAllProducts(req, res) {

    try {
      const products = await Product.find();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: `Internal server error: ${error}` });
    }
  }

  static async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: `Internal server error: ${error}` });
    }
  }

  static async addProduct(req, res) {
    try {
      const {
        name,
        description,
        type,
        unitPrice,
        image,
        amountInStock,
        quantitySold,
      } = req.body;

  

      const newProduct = new Product({
        _id: uuidv4(),
        name,
        description,
        type,
        unitPrice,
        image,
        amountInStock,
        quantitySold,
      });

      await newProduct.save();


      res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: newProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: `Internal server error: ${error}` });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const {
        name,
        description,
        type,
        unitPrice,
        image,
        amountInStock,
        quantitySold,
      } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      product.name = name;
      product.description = description;
      product.type = type;
      product.unitPrice = unitPrice;
      product.image = image;
      product.amountInStock = amountInStock;
      product.quantitySold = quantitySold;

      await product.save();

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: `Internal server error: ${error}` });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;

      const product = await Product.findOneAndDelete({ _id: productId });

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: `Internal server error: ${error}` });
    }
  }

  static async recordPayment(req, res) {


    try {
      const products = req.body;

  
      for (const { productId, quantity } of products) {
        const product = await Product.findById(productId);
  
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: `Product with ID ${productId} not found` });
        }
  
        if (quantity > product.amountInStock) {
          return res
            .status(400)
            .json({ success: false, message: `Not enough stock available for product ${productId}` });
        }
  
        product.amountInStock -= quantity;
        product.quantitySold += quantity;
  
        await product.save();
      }
  
      res.status(200).json({
        success: true,
        message: "Payment recorded successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: `Internal server error: ${error}` });
    }
  }
}

export default ProductController;
