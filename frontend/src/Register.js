
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function signUp() {
        try {
            let item = { name, email, password };
            let result = await fetch("https://product-lists-ser.vercel.app/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (result.status === 409) {
                setError("User with this email already exists");
            } else if (!result.ok) {
                throw new Error(`Failed with status: ${result.status}`);
            } else {
                result = await result.json();
                console.log("result", result);
                navigate("/login");
            }
        } catch (error) {
            console.error("Error in fetch:", error);
            setError("Server is not live. Please try again later.");
        }
    }

    return (
        <>
            <Header />
            <div className="col-sm-6 offset-sm-3 cont-wrapper">
                <h2>User Sign up</h2>
                <input type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} className="form-control" /> <br />
                <input type="text" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} className="form-control" /> <br />
                <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className="form-control" /> <br />
                <button onClick={signUp} className="btn btn-primary">Sign up</button>
                {error && <div className="text-danger">{error}</div>}
            </div>
        </>
    )
}

export default Register;
