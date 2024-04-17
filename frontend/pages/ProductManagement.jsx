import React, { useEffect, useState, useCallback } from "react";
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
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    type: "",
    unitPrice: "",
    image:
      "https://i5.walmartimages.com/seo/Great-Value-Purified-Drinking-Water-16-9-fl-oz-24-Count_ccb7a298-8772-4ef2-bf1f-e50b467979ea.77cc0effbfcdfd781b754be92d2d098c.jpeg?odnHeight=717&odnWidth=717&odnBg=FFFFFF",
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/product-api/products"
      );
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const addProduct = async () => {
    if (
      newProduct.name.trim() !== "" &&
      newProduct.description.trim() !== "" &&
      newProduct.type.trim() !== "" &&
      newProduct.unitPrice !== null &&
      newProduct.unitPrice !== undefined &&
      newProduct.unitPrice !== ""
    ) {
      try {
        const response = await fetch(
          "http://localhost:3000/product-api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setProducts([...products, data]);
          setNewProduct({
            name: "",
            description: "",
            type: "",
            unitPrice: "",
            image:
              "https://i5.walmartimages.com/seo/Great-Value-Purified-Drinking-Water-16-9-fl-oz-24-Count_ccb7a298-8772-4ef2-bf1f-e50b467979ea.77cc0effbfcdfd781b754be92d2d098c.jpeg?odnHeight=717&odnWidth=717&odnBg=FFFFFF",
          });
          setShowModal(false);
        } else {
          console.error("Failed to add product", await response.text());
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const editProduct = async (selectedProductId) => {
    if (
      newProduct.name.trim() !== "" &&
      newProduct.description.trim() !== "" &&
      newProduct.type.trim() !== "" &&
      newProduct.unitPrice.trim() !== ""
    ) {
      const updatedProduct = {
        name: newProduct.name,
        description: newProduct.description,
        type: newProduct.type,
        unitPrice: parseFloat(newProduct.unitPrice),
        image: newProduct.image,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/product-api/products/${selectedProductId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          const updatedProducts = products.map((product) =>
            product._id === selectedProductId ? data : product
          );

          setProducts(updatedProducts);
          setNewProduct({
            name: "",
            description: "",
            type: "",
            unitPrice: "",
            image:
              "https://i5.walmartimages.com/seo/Great-Value-Purified-Drinking-Water-16-9-fl-oz-24-Count_ccb7a298-8772-4ef2-bf1f-e50b467979ea.77cc0effbfcdfd781b754be92d2d098c.jpeg?odnHeight=717&odnWidth=717&odnBg=FFFFFF",
          });
          setEditModal(false);
        } else {
          console.error("Failed to update product");
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [editProduct,addProduct]);

  const onDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/product-api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
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
        {products.length !== 0 ? (
          products.map((product) => (
            <Card key={product._id} style={{ border: "none" }}>
              <Card.Img
                variant="top"
                style={{ height: "200px" }}
                src={product.image}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Type: {product.type}</Card.Text>
                <Card.Text>Unit Price: ${product.unitPrice} JMD</Card.Text>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => onDelete(product._id)}>Delete</Button>
                  <Button
                    onClick={() => {
                      setSelectedProduct(product);
                      setEditModal(true);
                      setNewProduct({
                        name: product.name,
                        description: product.description,
                        type: product.type,
                        unitPrice: product.unitPrice.toString(),
                        image: product.image,
                      });
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No Products</div>
        )}
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
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="productType">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product type"
              value={newProduct.type}
              onChange={(e) =>
                setNewProduct({ ...newProduct, type: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="productUnitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              step="1"
              placeholder="Enter unit price"
              value={newProduct.unitPrice}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unitPrice: e.target.value })
              }
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
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="productType">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product type"
              value={newProduct.type}
              onChange={(e) =>
                setNewProduct({ ...newProduct, type: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="productUnitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              step="1"
              placeholder="Enter unit price"
              value={newProduct.unitPrice}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unitPrice: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => editProduct(selectedProduct._id)}
          >
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductManagement;
