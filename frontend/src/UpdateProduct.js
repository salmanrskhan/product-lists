import Header from "./Header";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

function UpdateProduct() {
    const { productId } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        descp: "",
        file: null,
    });
    const [successMessage, setSuccessMessage] = useState("");
    const isFormEmpty = !formData.name && !formData.price && !formData.descp && formData.file === null;

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await fetch(`http://localhost:4500/product/${productId}`);
                if (result.status !== 200) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await result.json();
                setDatas(data);

                if (data && data.name && data.price && data.descp) {
                    setFormData({
                        name: data.name,
                        price: data.price,
                        descp: data.descp,
                    });
                } else {
                    console.error('Invalid data received from the server');
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchData();
    }, [productId]);


    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleInputImage = (e) => {
        const file = fileInputRef.current.files[0];

        setFormData({
            ...formData,
            file: file,
        });
    };

    const handleUpdate = async () => {
        try {
            const { name, price, descp, file } = formData;

            const updatedData = new FormData();
            updatedData.append("name", name);
            updatedData.append("price", price);
            updatedData.append("descp", descp);

            if (file !== null) {
                updatedData.append("file", file);
            }

            const response = await fetch(`http://localhost:4500/product/${productId}`, {
                method: 'PUT',
                body: updatedData,
            });

            if (response.status === 200) {
                console.log('Update successful');

                setSuccessMessage("Product update successfully");

                fileInputRef.current.value = null;
                setFormData({
                    name: "",
                    price: "",
                    descp: "",
                    file: null,
                });

                setTimeout(() => {
                    setSuccessMessage("");
                }, 4000);
            } else {
                console.error('Update failed');
                console.error(await response.text());
            }
        } catch (error) {
            console.error('Error updating data: ', error);
        }
    };



    return (
        <div>
            <Header />
            <h2>Update</h2>
            <div className="col-sm-6 offset-sm-3">
                {successMessage && <div className="text-success">{successMessage}</div>}
                <form>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-control"
                    /> <br />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="form-control"
                    /> <br />
                    <input
                        type="text"
                        name="descp"
                        value={formData.descp}
                        onChange={handleInputChange}
                        className="form-control"
                    /> <br />

                    <div className="d-flex">
                        <div className="col-sm-10">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="form-control"
                                onChange={handleInputImage}
                            />
                        </div>
                        {
                            isFormEmpty ? null

                                : (
                                    <div className="col-sm-2">
                                        <img style={{ width: 50 }} src={`http://localhost:4500/${datas.file}`} alt={datas.name} />
                                    </div>
                                )

                        }

                    </div><br />

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdate}
                        disabled={isFormEmpty}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;