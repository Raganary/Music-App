import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(login({
            name: username,
            password: password,
            loggedIn:true,
        }));
        /*
        try {
            const response = await axios.get('http://localhost:8000/', {
                auth: {
                  username: username,
                  password: password
                }
              });
        } catch (error) {
          setError('Invalid username or password');
        }*/
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-white">
            <div className="flex flex-col absolute z-10 right-0 bg-[#000000] outline-white outline rounded-lg p-4 text-sm xl:right-0">
                <h6>Username</h6>
                <input
                    name="user-field"
                    autoComplete="on"
                    id="user-field"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 bg-white border-none outline-none rounded-lg placeholder-gray-400 text-black p-3 mb-3 mt-1"
                />
                <h6>Password</h6>
                <input
                    name="password-field"
                    autoComplete="on"
                    id="password-field"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-white border-none outline-none rounded-lg placeholder-gray-400 text-black p-3 mb-3 mt-1"
                />
                {error && <p>{error}</p>}

                <button type="submit" className="flex-1 text-white rounded-lg transition delay-150 bg-[#942b34] py-2 hover:bg-[#471f22]">
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default Login;
