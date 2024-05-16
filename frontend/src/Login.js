
import Header from "./Header";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function login() {
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await fetch("https://product-lists-ser.vercel.app/login/admin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                const data = await response.json();
                // Extract user data, including the name
                const { name } = data.user;
                localStorage.setItem('user-info', JSON.stringify(data.user));
                localStorage.setItem('user-name', name);
                navigate("/");
            } else if (response.status === 404) {
                setError("User not found. Please check your email.");
                setTimeout(() => {
                    setError("");
                }, 1000);
            } else if (response.status === 401) {
                setError("Incorrect password. Please try again.");
            } else {
                setError("Login failed. Please try again later.");
            }
        } catch (error) {
            console.error("Error: ", error);
            setError("Server is not live. Please try again later.");
        }
    }


    return (
        <div>
            <Header />
            <h2>Login</h2>
            <div className="col-sm-6 offset-sm-3">
                <input
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                /> <br />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                /> <br />
                <button onClick={login} className="btn btn-primary">Login</button>
                {error && <div className="text-danger">{error}</div>}
            </div>
        </div>
    )
}

export default Login;
