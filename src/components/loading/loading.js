//Freyes 22/04/2024
import React from "react";

const LoadingComponent = () => {
    return (
        <div className="d-flex justify-content-center" style={{marginTop: "15%"}}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingComponent