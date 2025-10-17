import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import {TopNav} from "@/components/Navbar/TopNav.tsx";

const AppLayout = () => {
    const location = useLocation();
    const hideNav = location.pathname === "/login";

    return (
        <div className="min-h-screen flex flex-col">
            {!hideNav && <TopNav />}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
