import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/features/userSlice";
import { render } from "react-dom";
import axios from 'axios';
import {FiUser, FiLogOut, FiSettings  } from 'react-icons/fi';
import { TbPlaylist } from "react-icons/tb";

const ProfileCard = ()=>{
    const {activeUser} = useSelector((state) => state.user);
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
        <div className="smooth-transition absolute right-0 top-8 z-10 cursor-pointer flex flex-col items-center bg-[#2d2d2d] backdrop-blur-lg bg-opacity-70 rounded-lg xl:right-0">
            <h3 className="text-white mt-3">{activeUser?.name}</h3>
            <ul className="text-white mb-4 mt-3">
                <DropdownItem img = {FiUser} text={"Profile"}/>
                <DropdownItem img = {TbPlaylist} text={"Playlists"}/>
                <DropdownItem img = {FiSettings} text={"Settings"}/>
                <li onClick={(e) => handleLogout(e)} className="flex flex-row items-center py-1 hover:bg-[#3B0D11] px-8 rounded-sm cursor-pointer">
                    <FiLogOut className="mr-3 h-5 w-5 text-white"/>
                    <a className="mt-1 mb-2">{"Logout"}</a>
                </li>
            </ul>
        </div>
    );
};

const DropdownItem = (items) =>{
    return(
        <li className="flex flex-row items-center py-1 hover:bg-[#3B0D11] px-8 rounded-sm cursor-pointer">
            <items.img className="mr-3 h-5 w-5 text-white"/>
            <a className="mt-1 mb-2">{items.text}</a>
        </li>
    );
};
export default ProfileCard;