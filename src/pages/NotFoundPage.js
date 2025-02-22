import { Link } from "react-router-dom";
import React from "react";

function NotFoundPage(){
    return(
        <>
            <h1>Page Not Found</h1>
            <Link to="/" >Back To HomePage</Link>
        </>
            
    )
}

export default NotFoundPage;