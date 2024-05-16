

import Header from "./Header";
import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";

function ProductList() {
    const [data, setData] = useState([]);
    const isMounted = useRef(true);
    const [empty, setEmpty] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        isMounted.current = true;
        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, []);

    const fetchData = async () => {
        try {
            const result = await fetch("http://localhost:4500/product");
            if (result.ok && isMounted.current) {
                const products = await result.json();
                if (products.length === 0) {
                    setEmpty(true); 
                } else {
                    setData(products);
                }
            } else {
                setError("Failed to fetch products");
            }
        } catch (error) {
            console.error("Error: ", error);
            setError("An error occurred while fetching products");
        }
    }

    async function delProduct(productId) {
        try {
            const result = await fetch(`http://localhost:4500/product/${productId}`, {
                method: 'DELETE',
            });
            if (result.ok) {
                const updatedProducts = data.filter(product => product._id !== productId);
                setData(updatedProducts);
            } else {
                console.error("Failed to delete the product");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div>
            <Header />
            <h2>Products</h2>
            <div className="col-sm-10 offset-sm-1">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan="6">
                                    <h2 className="text-danger text-center">{error}</h2>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {empty ? (
                                    <tr>
                                        <td colSpan="6">
                                            <div className="text-center">
                                                <h2 className="text-success">No products found</h2>
                                                <button onClick={() => navigate("/add")} className="btn btn-secondary">Add Product</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                <img
                                                    style={{ width: 100 }}
                                                    src={`http://localhost:4500/${product.file}`}
                                                    alt={product.name}
                                                />
                                            </td>
                                            <td>$ {product.price}</td>
                                            <td>{product.descp}</td>
                                            <td>
                                                <button
                                                    onClick={() => delProduct(product._id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                                <Link to={`/update/${product._id}`}>
                                                    <span className="btn btn-sm btn-success ms-2">Update</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}

export default ProductList;

