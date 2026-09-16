import React from "react";
import { Outlet } from "react-router-dom";
import LanguageSelector from "../component/others/LanguageSelector";
import Nav from "../component/Nav/Nav";
import Footer from "../component/Footers/Footer";

const WebSite = () => {
    return (
        <div className="relative min-h-screen bg-gray-50">
            <Nav />

            <main className="min-h-[calc(100vh-76px)]">
                <Outlet />
            </main>

            <div className="">
                <Footer />
            </div>
        </div>
    );
};

export default WebSite;