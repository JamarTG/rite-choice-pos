import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  image: { type: String, required: true },
  amountInStock: { type: Number, default: 0},
  quantitySold: { type: Number, default: 101},
});

const Product = mongoose.model("Product", productSchema);

export default Product;
