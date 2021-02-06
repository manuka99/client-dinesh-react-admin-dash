import React from 'react'
import { Outlet } from "react-router-dom";

function ProductMain() {
    return (
      <div>
        <Outlet />
      </div>
    );
}

export default ProductMain
