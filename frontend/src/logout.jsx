import React from "react";

const LogOut=({fetch})=>{
    return <>
    <button className="btn delete" onClick={fetch}>
    Log Out
    </button>
    </>
};

export default LogOut