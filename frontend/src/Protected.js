import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate("/register");
        }
    }, [])

    let Cmp=props.Cmp

    return (
        <div>
           <Cmp />
        </div>
    )
}


export default Login;