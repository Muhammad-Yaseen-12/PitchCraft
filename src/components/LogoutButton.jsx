import React from "react";
import { auth, signOut } from '../config/firebase'
import { useNavigate } from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import { message } from 'antd';
function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);

            message.success("Logout successfully!");
            
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <button className="cursor-pointer w-full bg-red-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-red-700 transition-colors duration-200" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;
