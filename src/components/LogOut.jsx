import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { logout } from "../redux/features/userSlice";
import { render } from "react-dom";
import axios from 'axios';

const LogOut = ()=>{
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
    
        dispatch(logout({
            name: null,
            password: null,
            loggedIn:false,
        }));
    };

    return(
        <div>
            
            <button onClick={(e) => handleLogout(e)} className="flex-1 text-slate-500 bg-amber-900 rounded-sm">Log Out</button>
        </div>

    );
};

export default LogOut;