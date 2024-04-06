import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  image: { type: String, required: true },
  amountInStock: { type: Number, required: true}, 
  quantitySold: { type: Number, required: true},
});

const Product = mongoose.model("Product", productSchema);

export default Product;
