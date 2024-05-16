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
        formData.append("file", fileInputRef.current.files[0]);
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
                    <input
                        type="file"
                        ref={fileInputRef} // Assign the ref to the file input
                        className="form-control"
                    /> <br />
                    <input type="number" placeholder='price' value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" /> <br />
                    <input type="text" placeholder='descp' value={descp} onChange={(e) => setDescp(e.target.value)} className="form-control" /> <br />
                    <button onClick={addProduct} className="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;



//  this method also works but problem is with upload input in not clear upload input after adding the product
// function AddProduct() {
//     const [name, setName] = useState("");
//     const [file, setFile] = useState(null); // Initialize file to null
//     const [price, setPrice] = useState("");
//     const [descp, setDescp] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");

//     useEffect(() => {
//         if (successMessage) {
//             // Clear the input fields after success message is set
//             setName("");
//             setFile(null); // Clear the file input by setting it to null
//             setPrice("");
//             setDescp("");

//             // Set a timer to clear the success message after 4 seconds
//             const timer = setTimeout(() => {
//                 setSuccessMessage("");
//             }, 4000);

//             return () => {
//                 clearTimeout(timer); // Clear the timer if the component unmounts
//             };
//         }
//     }, [successMessage]);

//     async function addProduct(e) {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("file", file);
//         formData.append("price", price);
//         formData.append("descp", descp);

//         try {
//             let result = await fetch("https://product-lists-ser.vercel.app/product", {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (result.ok) {
//                 setSuccessMessage("Product added successfully");
//             } else {
//                 console.error("Failed to add the product");
//             }
//         } catch (error) {
//             console.error("Error: ", error);
//         }
//     }
// }


// =================================
// let result = await fetch("https://product-lists-ser.vercel.app/product", {
//     method: 'POST',
//     body: formData,
// });

// if (result.ok) {
//     console.log("Product added successfully");

//     setSuccessMessage("Product added successfully");

//     setName("");
//     setFile("");
//     setPrice("");
//     setDescp("");
// } else {
//     console.error("Failed to add product");
// }