import React, { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../contexts/auth";
import { Navigate } from "react-router-dom";


function ProductManagement() {

  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }
  const [editModal, setEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Spring Water 500ml",
      description: "Fresh natural spring water in a convenient 500ml bottle.",
      type: "Spring Water",
      unitPrice: 700,
      image:
        "https://www.icemountainwater.com/sites/g/files/zmtnxh171/files/2022-10/ice_mountain-spring-water-product-detail--5Gal-single.png",
    },
    {
      id: 2,
      name: "Mineral Water 1L",
      description: "Purified mineral water in a 1L bottle.",
      type: "Mineral Water",
      unitPrice: 100,
      image:
        "https://media.gettyimages.com/id/185072125/photo/bottle-of-spring-water.jpg?s=612x612&w=0&k=20&c=8uCYpbrjtHF9Gx-P3zQ27aDafFB_oJcxzXzry9CrnRc=",
    },
    {
      id: 4,
      name: "Mineral Water 1L",
      description: "Purified mineral water in a 1L bottle.",
      type: "Mineral Water",
      unitPrice: 100,
      image:
        "https://media.gettyimages.com/id/185072125/photo/bottle-of-spring-water.jpg?s=612x612&w=0&k=20&c=8uCYpbrjtHF9Gx-P3zQ27aDafFB_oJcxzXzry9CrnRc=",
    },
    {
      id: 5,
      name: "Purified Water 5L",
      description: "High-quality purified water in a 5L container.",
      type: "Purified Water",
      unitPrice: 1400,
      image:
        "https://greatlakesrefreshments.com/wp-content/uploads/2021/04/fmf_xqQyjj1.jpg",
    },
    {
      id: 6,
      name: "Spring Water 500ml",
      description: "Fresh natural spring water in a convenient 500ml bottle.",
      type: "Spring Water",
      unitPrice: 700,
      image:
        "https://www.icemountainwater.com/sites/g/files/zmtnxh171/files/2022-10/ice_mountain-spring-water-product-detail--5Gal-single.png",
    },
    {
      id: 7,
      name: "Spring Water 500ml",
      description: "Fresh natural spring water in a convenient 500ml bottle.",
      type: "Spring Water",
      unitPrice: 700,
      image:
        "https://www.icemountainwater.com/sites/g/files/zmtnxh171/files/2022-10/ice_mountain-spring-water-product-detail--5Gal-single.png",
    },
    {
      id: 8,
      name: "Mineral Water 1L",
      description: "Purified mineral water in a 1L bottle.",
      type: "Mineral Water",
      unitPrice: 100,
      image:
        "https://media.gettyimages.com/id/185072125/photo/bottle-of-spring-water.jpg?s=612x612&w=0&k=20&c=8uCYpbrjtHF9Gx-P3zQ27aDafFB_oJcxzXzry9CrnRc=",
    },
    {
      id: 9,
      name: "Mineral Water 1L",
      description: "Purified mineral water in a 1L bottle.",
      type: "Mineral Water",
      unitPrice: 100,
      image:
        "https://media.gettyimages.com/id/185072125/photo/bottle-of-spring-water.jpg?s=612x612&w=0&k=20&c=8uCYpbrjtHF9Gx-P3zQ27aDafFB_oJcxzXzry9CrnRc=",
    },
    {
      id: 10,
      name: "Purified Water 5L",
      description: "High-quality purified water in a 5L container.",
      type: "Purified Water",
      unitPrice: 1400,
      image:
        "https://greatlakesrefreshments.com/wp-content/uploads/2021/04/fmf_xqQyjj1.jpg",
    },
    {
      id: 11,
      name: "Spring Water 500ml",
      description: "Fresh natural spring water in a convenient 500ml bottle.",
      type: "Spring Water",
      unitPrice: 700,
      image:
        "https://www.icemountainwater.com/sites/g/files/zmtnxh171/files/2022-10/ice_mountain-spring-water-product-detail--5Gal-single.png",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productUnitPrice, setProductUnitPrice] = useState("");

  const addProduct = () => {
    if (
      productName.trim() !== "" &&
      productDescription.trim() !== "" &&
      productType.trim() !== "" &&
      productUnitPrice.trim() !== ""
    ) {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDescription,
        type: productType,
        unitPrice: parseFloat(productUnitPrice),
        image:
          "https://i5.walmartimages.com/seo/Great-Value-Purified-Drinking-Water-16-9-fl-oz-24-Count_ccb7a298-8772-4ef2-bf1f-e50b467979ea.77cc0effbfcdfd781b754be92d2d098c.jpeg?odnHeight=717&odnWidth=717&odnBg=FFFFFF",
      };
      setProducts([...products, newProduct]);
      setProductName("");
      setProductDescription("");
      setProductType("");
      setProductUnitPrice("");
      setShowModal(false);
    }
  };

  const editProduct = (selectedProductId) => {

    console.log(productName,productType,productUnitPrice,selectedProductId)
    if (
      productName.trim() !== "" &&
      productDescription.trim() !== "" &&
      productType.trim() !== "" &&
      productUnitPrice.trim() !== ""
    ) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProductId
          ? {
              ...product,
              name: productName,
              description: productDescription,
              type: productType,
              unitPrice: parseFloat(productUnitPrice),
            }
          : product
      );

      
      setProducts(updatedProducts);
      setProductName("");
      setProductDescription("");
      setProductType("");
      setProductUnitPrice("");
      setEditModal(false);
    }

    
  };

  const onDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div className="container mt-5">
      <Button onClick={() => setShowModal(true)}>
        <img src="./add.svg" alt="" />
      </Button>

      <Container
        className="mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <Card key={product.id} style={{ border: "none" }}>
            <Card.Img
              variant="top"
              style={{ height: "200px" }}
              src={product.image}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Type: {product.type}</Card.Text>
              <Card.Text>
                Unit Price: ${product.unitPrice.toFixed(2)} JMD
              </Card.Text>
              <div
                style={{
                  display: "flex",

                  gap: "10px",
                  paddingBottom: "10px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "grey",
                    borderWidth: "3px",
                  }}
                  onClick={() => onDelete(product.id)}
                >
                  🗑️
                </Button>
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "blue",
                    borderWidth: "3px",
                  }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setEditModal(true);
                  }}
                >
                  ✏️
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productType">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productUnitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              step="1"
              placeholder="Enter unit price"
              value={productUnitPrice}
              onChange={(e) => setProductUnitPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productType">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productUnitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              step="1"
              placeholder="Enter unit price"
              value={productUnitPrice}
              onChange={(e) => setProductUnitPrice(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => editProduct(selectedProduct.id)}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductManagement;
