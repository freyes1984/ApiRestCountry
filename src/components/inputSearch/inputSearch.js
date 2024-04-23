//Freyes 22/04/2024
import React from "react";

const InputSearch = ({referenc, eventOnChange}) => {
    return(
        <input
            ref={referenc}
            className="form-control"
            id="search"
            name="search"
            type="search"
            placeholder="Search"
            onChange={eventOnChange}
        />
    )
}

export default InputSearch;