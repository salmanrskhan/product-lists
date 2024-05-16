import Header from "./Header";
import React, { useState, useEffect, useRef } from 'react';

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [descp, setDescp] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fileInputRef = useRef(null);

    async function addProduct(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", name);
        // formData.append("file", fileInputRef.current.files[0]);
        formData.append("price", price);
        formData.append("descp", descp);

        try {
            let result = await fetch("https://product-lists-ser.vercel.app/product", {
                method: 'POST',
                body: formData,
            });

            console.log(formData)

            if (result.ok) {
                console.log("Product added successfully");

                setSuccessMessage("Product added successfully");

                setName("");
                setPrice("");
                setDescp("");

                fileInputRef.current.value = null;

                setTimeout(() => {
                    setSuccessMessage("");
                }, 4000);
            } else {
                console.error("Failed to add the product");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div>
            <Header />
            <h2>Add</h2>
            <div className="col-sm-6 offset-sm-3">
                <br />
                {successMessage && <div className="text-success">{successMessage}</div>}
                <form encType="multipart/form-data">
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" /> <br />
                    {/* <input
                        type="file"
                        ref={fileInputRef}
                        className="form-control"
                    /> <br /> */}
                    <input type="number" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" /> <br />
                    <input type="text" placeholder='descp' value={descp} onChange={(e) => setDescp(e.target.value)} className="form-control" /> <br />
                    <button onClick={addProduct} className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;