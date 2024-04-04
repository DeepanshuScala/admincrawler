import React, { useEffect, useState } from 'react'
import Header from "../Header";
import Sidepanal from "../Sidepanal";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



export default function DashboardLayout() {

    let location = useLocation();
    const [openMenu, setopenMenu] = useState(false);

    useEffect(() => {
        if(openMenu) setopenMenu(false); 
    }, [location.pathname]);

    const handleMenuClick = () => {
        setopenMenu(!openMenu); 
    };


    return (
        <div className="h-min-screen">
            <Header />
            <Sidepanal />
        </div>
    )
}
